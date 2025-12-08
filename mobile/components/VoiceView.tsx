import { Modal, Pressable, Text, View } from "react-native";
import { styles } from "../styles/styles";

export type VoiceViewProps = {
  isVisible: boolean;
  onClose: () => void;
};

export const VoiceView = ({ isVisible, onClose }: VoiceViewProps) => {
  return (
    <Modal
      visible={isVisible}
      animationType="fade"
      transparent={true}
      style={styles.fullScreenView}
    >
      <View style={styles.addView}>
        <Pressable onPress={onClose} style={styles.pressableButton}>
          <Text style={styles.addText}>Stop</Text>
        </Pressable>
      </View>
    </Modal>
  );
};
