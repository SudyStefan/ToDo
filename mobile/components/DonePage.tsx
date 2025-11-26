import { useEffect, useState } from "react";
import { View, Text, TextInput, Button, FlatList, Pressable, StyleSheet, Dimensions } from "react-native";
import { ToDoEntry, ToDoStatus, ToDoType } from "../../shared/types/ToDoEntry";
import { styles } from "../styles/styles";
import { ToDoItem } from "./ToDoItem";

export type DonePageProp = {
  data: ToDoEntry[];
  onUncheck: Function;
  onDelete: Function;
};

export const DonePage = ({data, onUncheck, onDelete}: DonePageProp) => {
  return (
    <FlatList
    data={data.filter(data => data.type === ToDoType.Single && data.status === ToDoStatus.Done)}
    keyExtractor={item => item._id}
    style={{flex: 1}}
    contentContainerStyle={styles.singleList}
    renderItem={({ item }) => 
      <ToDoItem 
      item={item} 
      onSwipe={onDelete} 
      onPress={onUncheck}
      swipeRight/>
    }/>
  );
}