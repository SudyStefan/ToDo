import { useEffect, useState } from "react";
import { View, Text, TextInput, Button, FlatList, Pressable, StyleSheet, Dimensions } from "react-native";
import { ToDoEntry, Status } from "../../shared/types/ToDoEntry";
import { styles } from "../styles/styles";
import { TodoItem } from "./TodoItem";

type SinglePageProp = {
  data: ToDoEntry[];
  onCheck: Function;
};

export default function SinglePage({data, onCheck}: SinglePageProp) {
  return (
    <FlatList testID="SinglePage"
    data={data.filter(data => data.status === Status.Open)}
    keyExtractor={item => item.id.toString()}
    contentContainerStyle={styles.todoList}
    renderItem={({ item }) => 
      <TodoItem 
      item={item} 
      onSwipe={onCheck} 
      onPress={onCheck} 
      swipeLeft={true} />
    }/>
  );
}