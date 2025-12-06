package api.gemini.services;


import com.google.genai.Client;
import com.google.genai.types.GenerateContentConfig;
import com.google.genai.types.GenerateContentResponse;
import com.google.genai.types.Schema;
import com.google.genai.types.Type;

public class GeminiService {
  public static void generateTodoDTO(String text) {
    Client client = Client.builder().apiKey(System.getenv("GEMINI_API_KEY")).build();

    Schema schema = Schema.builder()
      .type(Type.Known.STRING)
      .title("text")
      .description("A concise summary of the input that can be put into a checklist.")
      .build();
          
    GenerateContentConfig config = GenerateContentConfig.builder()
      .responseMimeType("application/json")
      .responseSchema(schema)
      .build();

    GenerateContentResponse response = client.models.generateContent("gemini-2.5-flash", text, config);

    System.out.println(response.text());
  }
}
