import { View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { styles } from "../styles/styles";
import React from "react";
import { UndoItem } from "./UndoItem";
import { RecentlyChanged } from "./Root";

type UndoProp = {
  data: RecentlyChanged[], 
  onUndo: Function, 
  onTimeout: Function,
}

export default function UndoPopup({data, onUndo, onTimeout }: UndoProp) {
  return(
    <View
    style={styles.undoView} 
    testID="UndoPopupView">
      <FlatList
      testID="UndoList"
      data={data} 
      keyExtractor={item => item.id.toString()}
      contentContainerStyle={styles.undoList}
      renderItem={({ item }) => 
        <UndoItem 
        text={item.text} 
        id={item.id}
        onUndo={() => onUndo(item.id)}
        onTimeout={() => onTimeout(item.id)} />
      }
      />
    </View>
  )
}

