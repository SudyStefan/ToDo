import { useEffect, useState } from "react";
import { View, Text, TextInput, Button, FlatList, Pressable, StyleSheet } from "react-native";
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import { ToDoEntry } from "../shared/types/ToDoEntry";
import { styles } from "./styles/styles";
import { TodoItem } from "./elements/TodoItem";
import { AddView } from "./elements/AddView";

const DummyData: ToDoEntry[] = [
  { id: 1, text: 'Learn TypeScript', done: true, creationDate: new Date("2025-10-01") },
  { id: 2, text: 'Build a ToDo App', done: false, creationDate: new Date("2025-10-01") },
  { id: 3, text: 'Test the App', done: false, creationDate: new Date("2025-10-01") },
  { id: 4, text: 'Learn CSS', done: false, creationDate: new Date("2025-10-01") },
];

export default function App() {
  const [todos, setTodos] = useState<ToDoEntry[]>(DummyData);
  const [text, setText] = useState("");
  const [addViewVisible, setAddViewVisible] = useState(false);

  const API_URL = "http://192.168.0.208:4000/todo";

  useEffect(() => {
    fetch(API_URL).then(res => res.json()).then(setTodos);
  }, []);

  const addTodo = () => {
    setTodos([...todos, { id: todos.length+1, text, done: false , creationDate: new Date()}]);
    setText("");
  }

  const checkTodo = (id: number) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, done: !todo.done } : todo));
  }

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  }

  
  return (
    <View style={{ padding: 20 }}>
      <AddView isVisible={addViewVisible} close={() => setAddViewVisible(false)}/>
      <Pressable onPress={() => setAddViewVisible(true)} style={styles.pressableButton}>
        <Text style={styles.pressableText}>ADD TASK</Text>
      </Pressable>
      <FlatList
        data={todos}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => 
          <View style={{ flexDirection: "row", gap: 5, alignContent:"flex-start", justifyContent: "space-between"}}>
            <TodoItem item={item} onDelete={deleteTodo} onPress={checkTodo}/>
          </View>
        }/>
    </View>
  );
}

