import React from 'react';
import { View, Text, Pressable, Modal} from "react-native";
import { styles } from "../styles/styles";
import { TextInput } from 'react-native-gesture-handler';

export const AddView = ({isVisible, onAdd, onClose}: any) => {
  const [text, setText] = React.useState("");
  const inputRef = React.useRef<TextInput>(null);

  return (
    <View>
      <Modal 
        visible={isVisible} 
        animationType="fade" 
        transparent={true}
        onShow={() => inputRef.current?.focus()}>
        <View style={styles.addView}>
          <TextInput 
            ref={inputRef} 
            style={{ ...styles.defaultText, textAlign: "center" }} 
            placeholder='add todo' 
            value={text} 
            onChangeText={setText} />
          <View style={{flexDirection:"row", marginLeft: 10}}>
            <Pressable onPress={() => onAdd(text)} style={styles.pressableButton}>
              <Text style={styles.pressableText}>ADD</Text>
            </Pressable>
            <Pressable onPress={onClose} style={{...styles.pressableButton, backgroundColor:"gray"}}>
              <Text style={styles.pressableText}>CANCEL</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}