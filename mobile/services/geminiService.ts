import axios from "axios";
import { Platform } from "react-native";

class GeminiService {
  public fetchFromTranscript = (text: string): Promise<string> => {
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

  public fetchFromAudio = (audioUri: string): Promise<string> => {
    const formData = new FormData();

    if (Platform.OS === "web") {
      return fetch(audioUri).then((res) =>
        res
          .blob()
          .then((blob) => {
            formData.append("audiofile", blob);
            return axios
              .post("http://localhost:8080/todoAudio", formData)
              .then((res) => res.data.responseText)
              .catch((err) => {
                throw err;
              });
          })
          .catch((err) => {
            throw err;
          })
      );
    } else {
      formData.append("audiofile", {
        uri: audioUri,
        type: "audio/m4a",
        name: audioUri.split("/").pop() || "recording.m4a"
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any);
      return axios
        .post("http://localhost:8080/todoAudio", formData)
        .then((res) => res.data.responseText)
        .catch((err) => {
          throw err;
        });
    }
  };
}

export const geminiService = new GeminiService();
