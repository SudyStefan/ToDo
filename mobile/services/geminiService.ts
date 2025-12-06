import axios from "axios";

class GeminiService {
  public fetchGeminiResponse = (text: string): Promise<string> => {
    return axios
      .post("http://localhost:8080/todo", text)
      .then((res) => {
        console.log(res.data);
        return res.data.responseText;
      })
      .catch((err) => {
        console.error(`Error trying to prompt gemini:`, err);
        throw err;
      });
  };
}

export const geminiService = new GeminiService();
