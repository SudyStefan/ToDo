import { useEffect, useState } from "react";
import { View, Text, TextInput, Button, FlatList, Pressable, StyleSheet, Dimensions } from "react-native";
import { ToDoEntry } from "../../shared/types/ToDoEntry";
import { styles } from "../styles/styles";
import { TodoItem } from "../elements/TodoItem";
import { AddView } from "../elements/AddView";
import Ionicons from '@expo/vector-icons/Ionicons'

export default function ToDo({data, API_URL}: {data: ToDoEntry[], API_URL?: string}) {
  const [todos, setTodos] = useState<ToDoEntry[]>(data);
  const [addViewVisible, setAddViewVisible] = useState(false);

  const handleAdd = (text: string) => {
    setTodos([...todos, { id: todos.length+1, text, done: false , creationDate: new Date()}]);
    setAddViewVisible(false);
  }

  const checkTodo = (id: number) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, done: !todo.done } : todo));
  }

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  }

  return (
    <View style={styles.root}>
        <AddView 
          isVisible={addViewVisible} 
          onAdd={handleAdd} 
          onClose={() => setAddViewVisible(false)}/>
          <FlatList
            data={todos}
            keyExtractor={item => item.id.toString()}
            contentContainerStyle={styles.todoList}
            renderItem={({ item }) => 
              <TodoItem item={item} onDelete={deleteTodo} onPress={checkTodo}/>
            }/>
      <Pressable onPress={() => setAddViewVisible(true)} style={styles.roundPressableButton}>
        <Ionicons name="add" size={Dimensions.get('window').height * 0.05} color="white" />
      </Pressable>
    </View>
  );
}