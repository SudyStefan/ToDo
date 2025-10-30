import { useEffect, useState } from "react";
import { View, Text, TextInput, Button, FlatList, Pressable, StyleSheet, Dimensions } from "react-native";
import { ToDoEntry, Status, Type } from "../../shared/types/ToDoEntry";
import { styles } from "../styles/styles";
import { ToDoItem } from "./ToDoItem";

type DonePageProp = {
  data: ToDoEntry[];
  onUncheck: Function;
  onDelete: Function;
};

export default function DonePage({data, onUncheck, onDelete}: DonePageProp) {
  return (
    <FlatList
    data={data.filter(data => data.type === Type.Single && data.status === Status.Done)}
    keyExtractor={item => item.id.toString()}
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