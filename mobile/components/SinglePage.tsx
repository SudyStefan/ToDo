import { useEffect, useState } from "react";
import { View, Text, TextInput, Button, FlatList, Pressable, StyleSheet, Dimensions } from "react-native";
import { ToDoEntry } from "../../shared/types/ToDoEntry";
import { styles } from "../styles/styles";
import { TodoItem } from "./TodoItem";

export default function SinglePage({data, onCheck, onDelete}: {data: ToDoEntry[], onCheck: Function, onDelete: Function}) {
  return (
    <FlatList
      data={data}
      keyExtractor={item => item.id.toString()}
      contentContainerStyle={styles.todoList}
      renderItem={({ item }) => 
        <TodoItem item={item} onDelete={onCheck} onPress={onDelete}/>
      }/>
  );
}