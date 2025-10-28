import { useEffect, useState } from "react";
import { View, Text, TextInput, Button, FlatList, Pressable, StyleSheet, Dimensions } from "react-native";
import { ToDoEntry, Status } from "../../shared/types/ToDoEntry";
import { styles } from "../styles/styles";
import { TodoItem } from "./TodoItem";

type DonePageProp = {
  data: ToDoEntry[];
  onUncheck: Function;
  onDelete: Function;
};

export default function DonePage({data, onUncheck, onDelete}: DonePageProp) {
  return (
    <FlatList
    data={data.filter(data => data.status === Status.Done)}
    keyExtractor={item => item.id.toString()}
    contentContainerStyle={styles.todoList}
    renderItem={({ item }) => 
      <TodoItem 
      item={item} 
      onSwipe={onDelete} 
      onPress={onUncheck}
      swipeRight/>
    }/>
  );
}