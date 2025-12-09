import { ActivityIndicator, Modal, Pressable, Text, View } from "react-native";
import { styles } from "../styles/styles";
import {
  ExpoSpeechRecognitionModule,
  useSpeechRecognitionEvent,
} from "@jamsch/expo-speech-recognition";
import { useState, Dispatch, SetStateAction, useEffect } from "react";

export type VoiceViewProps = {
  isRecognizing: boolean;
  setIsRecognizing: Dispatch<SetStateAction<boolean>>;
  onClose: (transcripedText: string) => void;
};

export const VoiceView = ({
  isRecognizing,
  setIsRecognizing,
  onClose,
}: VoiceViewProps) => {
  const [transcript, setTranscript] = useState("");

  useSpeechRecognitionEvent("start", () => setIsRecognizing(true));
  useSpeechRecognitionEvent("end", () => setIsRecognizing(false));
  useSpeechRecognitionEvent("result", (event) => {
    console.log("event called");
    setTranscript(event.results[0].transcript);
  });
  useSpeechRecognitionEvent("error", (event) => {
    console.error("error code:", event.error, "error msg:", event.message);
  });

  const handleStart = () => {
    ExpoSpeechRecognitionModule.requestPermissionsAsync().then((result) => {
      if (!result.granted) {
        console.warn("Permission not granted", result);
        return;
      }
      ExpoSpeechRecognitionModule.start({
        lang: "en-US",
        interimResults: true,
      });
    });
  };

  const handleStop = () => {
    ExpoSpeechRecognitionModule.stop();
    console.log("transcript:", transcript);
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
          <ActivityIndicator size="large" />
          <Text style={styles.addText}>Recognizing...</Text>
          <Pressable onPress={handleStop} style={styles.pressableButton}>
            <Text style={styles.addText}>Stop</Text>
          </Pressable>
        </View>
      )}
    </Modal>
  );
};
