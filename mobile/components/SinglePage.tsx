import { useEffect, useState } from "react";
import { View, Text, TextInput, Button, FlatList, Pressable, StyleSheet, Dimensions } from "react-native";
import { ToDoEntry } from "../../shared/types/ToDoEntry";
import { styles } from "../styles/styles";
import { TodoItem } from "./TodoItem";

type SinglePageProp = {
  data: ToDoEntry[];
  onCheck: Function;
  onDelete: Function;
};

export default function SinglePage({data, onCheck, onDelete}: SinglePageProp) {
  return (
    <FlatList testID="SinglePage"
    data={data.filter(data => data.done === false)}
    keyExtractor={item => item.id.toString()}
    contentContainerStyle={styles.todoList}
    renderItem={({ item }) => 
      <TodoItem 
      item={item} 
      onSwipe={() => onDelete()} 
      onPress={onCheck} 
      swipeLeft={true} />
    }/>
  );
}