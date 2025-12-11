import { ActivityIndicator, Modal, Pressable, Text, View } from "react-native";
import { colors, styles } from "../styles/styles";
import {
  ExpoSpeechRecognitionModule,
  useSpeechRecognitionEvent
} from "expo-speech-recognition";
import { useState, Dispatch, SetStateAction, useEffect } from "react";

export type VoiceViewProps = {
  isRecognizing: boolean;
  setIsRecognizing: Dispatch<SetStateAction<boolean>>;
  onClose: (transcripedText: string) => void;
};

export const VoiceView = ({
  isRecognizing,
  setIsRecognizing,
  onClose
}: VoiceViewProps) => {
  const [transcript, setTranscript] = useState("");

  useSpeechRecognitionEvent("start", () => setIsRecognizing(true));
  useSpeechRecognitionEvent("end", () => setIsRecognizing(false));
  useSpeechRecognitionEvent("result", (event) => {
    setTranscript(event.results[0].transcript);
  });
  useSpeechRecognitionEvent("error", (event) => {
    console.error("error code:", event.error, "error msg:", event.message);
  });
  useSpeechRecognitionEvent("nomatch", (event) => {
    console.warn("No match:", event);
  });

  const handleStart = () => {
    ExpoSpeechRecognitionModule.requestPermissionsAsync().then((result) => {
      if (!result.granted) {
        console.warn("Permission not granted", result);
        return;
      }
      console.log("Starting speech recognition...");
      ExpoSpeechRecognitionModule.start({
        lang: "en-US",
        interimResults: true,
        continuous: true
      });
    });
  };

  const handleStop = () => {
    ExpoSpeechRecognitionModule.stop();
    onClose(transcript);
  };

  useEffect(() => {
    isRecognizing && handleStart();
  }, [isRecognizing]);

  return (
    <Modal
      visible={isRecognizing}
      animationType="fade"
      transparent={true}
      style={styles.fullScreenView}
    >
      {isRecognizing && (
        <View style={styles.addView}>
          <Text
            style={{ ...styles.addText, textAlign: "center", marginBottom: 20 }}
          >
            {transcript ? transcript : "Listening..."}
          </Text>
          <View style={{ flexDirection: "row", marginLeft: 10 }}>
            <Pressable onPress={handleStop} style={styles.pressableButton}>
              <Text style={styles.addText}>PROCESS</Text>
            </Pressable>
            <Pressable
              onPress={() => setTranscript("")}
              style={{
                ...styles.pressableButton,
                backgroundColor: colors.soxred
              }}
            >
              <Text style={styles.addText}>RESET</Text>
            </Pressable>
          </View>
          <ActivityIndicator size="large" style={styles.speechIndicator} />
        </View>
      )}
    </Modal>
  );
};
