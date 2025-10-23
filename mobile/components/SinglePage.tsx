import { useEffect, useState } from "react";
import { View, Text, TextInput, Button, FlatList, Pressable, StyleSheet, Dimensions } from "react-native";
import { ToDoEntry } from "../../shared/types/ToDoEntry";
import { styles } from "../styles/styles";
import { TodoItem } from "./TodoItem";

export default function SinglePage({data, API_URL}: {data: ToDoEntry[], API_URL?: string}) {
  const [todos, setTodos] = useState<ToDoEntry[]>(data);

  const checkTodo = (id: number) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, done: !todo.done } : todo));
  }

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  }

  return (
    <FlatList
      data={todos}
      keyExtractor={item => item.id.toString()}
      contentContainerStyle={styles.todoList}
      renderItem={({ item }) => 
        <TodoItem item={item} onDelete={deleteTodo} onPress={checkTodo}/>
      }/>
  );
}