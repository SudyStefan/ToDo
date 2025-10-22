import React from 'react';
import { View, Text, Pressable, Modal} from "react-native";
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import { styles } from "../styles/styles";
import { ToDoEntry } from "../../shared/types/ToDoEntry";

export const AddView = ({isVisible, close}: any) => {
  return (
    <View style={styles.addView}>
      <Modal visible={isVisible} animationType="fade" transparent={true}>
        <Text>ADD ITEM</Text>
        <View style={{flexDirection:"row"}}>
          <Pressable style={styles.pressableButton}>
            <Text style={styles.pressableText}>Add</Text>
          </Pressable>
          <Pressable onPress={() => close()} style={styles.pressableButton}>
            <Text style={styles.pressableText}>Close</Text>
          </Pressable>
          </View>
      </Modal>
    </View>
  );
}