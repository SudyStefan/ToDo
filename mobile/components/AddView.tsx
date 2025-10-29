import React from 'react';
import { View, Text, Pressable, Modal} from "react-native";
import { styles, colors } from "../styles/styles";
import { TextInput } from 'react-native-gesture-handler';
import { Type } from '../../shared/types/ToDoEntry';

type AddViewProps = {
  isVisible: boolean,
  onAdd: Function,
  onClose: Function,
};

export const AddView = ({isVisible, onAdd, onClose}: AddViewProps) => {
  const [text, setText] = React.useState("");
  const inputRef = React.useRef<TextInput>(null);

  const initClose = () => {
    setText("");
    onClose();
  }

  return (
    <View style={styles.fullScreenView} testID='AddView'>
      <Modal 
      visible={isVisible} 
      animationType="fade" 
      transparent={true}
      style={styles.fullScreenView}
      onShow={() => inputRef.current?.focus()}>
      <View style={styles.addView}>
        <TextInput 
        ref={inputRef} 
        style={{ ...styles.defaultText, textAlign: "center" }} 
        placeholder='todo name...' 
        value={text} 
        onChangeText={setText} />
        <View style={{flexDirection:"row", marginLeft: 10}}>
          <Pressable onPress={() => {onAdd(text, Type.Single); initClose()}} style={styles.pressableButton}>
            <Text style={styles.defaultText}>ADD</Text>
          </Pressable>
          <Pressable onPress={() => initClose()} style={{...styles.pressableButton, backgroundColor: colors.soxred}}>
            <Text style={styles.defaultText}>CANCEL</Text>
          </Pressable>
        </View>
      </View>
      </Modal>
    </View>
  );
}