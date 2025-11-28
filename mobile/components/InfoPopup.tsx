import { View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { styles } from "../styles/styles";
import React from "react";
import { UndoItem } from "./UndoItem";
import { ErrorItem } from "./ErrorItem";
import { TodoStatus } from "../models/todoItem";

export type PopupItem = {
  id: string,
  text: string,
  prevStatus?: TodoStatus,
  currentStatus?: TodoStatus,
};

export type UndoProp = {
  data: PopupItem[], 
  onUndo: Function, 
  onTimeout: Function,
}

export const wait = (ms: number) =>
  new Promise(resolve => setTimeout(resolve, ms));

export const InfoPopup = ({data, onUndo, onTimeout }: UndoProp) => {
  return(
    <View
    style={styles.undoView} 
    testID="InfoPopupView">
      <FlatList
      testID="PupupList"
      data={data} 
      keyExtractor={item => item.id}
      contentContainerStyle={styles.undoList}
      renderItem={({ item }) => item.prevStatus != null ?
        <UndoItem 
        text={item.text} 
        onUndo={() => onUndo(item.id)}
        onTimeout={() => onTimeout(item.id)} />
        : 
        <ErrorItem 
        error={item.text} />
      }
      />
    </View>
  )
}

