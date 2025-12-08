import React from "react";
import { View, Text, Pressable, Modal } from "react-native";
import { styles, colors } from "../styles/styles";
import { TextInput } from "react-native-gesture-handler";
import { TodoType } from "../types/todo";

export type AddViewProps = {
  isVisible: boolean;
  onAdd: (text: string, type: TodoType) => void;
  onClose: () => void;
};

export const AddView = ({ isVisible, onAdd, onClose }: AddViewProps) => {
  const [text, setText] = React.useState("");
  const inputRef = React.useRef<TextInput>(null);

  const initClose = () => {
    setText("");
    onClose();
  };

  return (
    <Modal
      visible={isVisible}
      animationType="fade"
      transparent={true}
      style={styles.fullScreenView}
      onShow={() => inputRef.current?.focus()}
    >
      <View style={styles.addView}>
        <TextInput
          ref={inputRef}
          style={{ ...styles.addText, textAlign: "center" }}
          placeholder="todo name..."
          value={text}
          onChangeText={(text) => setText(text)}
        />
        <View style={{ flexDirection: "row", marginLeft: 10 }}>
          <Pressable
            onPress={() => {
              onAdd(text, TodoType.SINGLE);
              initClose();
            }}
            style={styles.pressableButton}
          >
            <Text style={styles.addText}>ADD</Text>
          </Pressable>
          <Pressable
            onPress={() => initClose()}
            style={{
              ...styles.pressableButton,
              backgroundColor: colors.soxred,
            }}
          >
            <Text style={styles.addText}>CANCEL</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};
