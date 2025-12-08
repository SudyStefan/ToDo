package api.gemini.services;


import java.util.ArrayList;

import com.google.genai.Client;
import com.google.genai.types.Content;
import com.google.genai.types.GenerateContentConfig;
import com.google.genai.types.GenerateContentResponse;
import com.google.genai.types.Part;
import com.google.genai.types.Schema;
import com.google.genai.types.Type;

import api.gemini.models.GeminiResponse;

public class GeminiService {
  public static GeminiResponse promptForTodo(String text) {
    Client client = Client.builder().apiKey(System.getenv("GEMINI_API_KEY")).build();

    Schema schema = Schema.builder()
      .type(Type.Known.STRING)
      .title("text")
      .description("A concise summary of the input, four words or less, that can be put into a checklist/todo list.")
      .build();
          
    GenerateContentConfig config = GenerateContentConfig.builder()
      .responseMimeType("application/json")
      .responseSchema(schema)
      .build();

    GenerateContentResponse response = client.models.generateContent("gemini-2.5-flash", text, config);

    return new GeminiResponse(response.text(), text);
  }

  public static GeminiResponse speechToText(byte[] audioBytes) {
    String prompt = """
        Process the audio file and try to extract the requested field from it.

        Requirements:
        1. Be accurate.
        2. It might be in English, German and potentially German with an Austrian dialect.
        """;

    Client client = Client.builder().apiKey(System.getenv("GEMINI_API_KEY")).build();

    ArrayList<Part> parts = new ArrayList<>();
    parts.add(Part.fromBytes(audioBytes, "audio/m4a"));
    parts.add(Part.fromText(prompt));

    Content content = Content.builder().parts(parts).build();

    Schema schema = Schema.builder()
      .type(Type.Known.STRING)
      .title("text")
      .description("A concise summary of the audio, four words or less, that can be put into a checklist/todo list.")
      .build();
          
    GenerateContentConfig config = GenerateContentConfig.builder()
      .responseMimeType("application/json")
      .responseSchema(schema)
      .build();

    GenerateContentResponse response = client.models.generateContent("gemini-2.5-flash", content, config);
    return new GeminiResponse(response.text(), "");
  }
}
