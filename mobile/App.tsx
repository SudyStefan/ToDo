import { useEffect, useState } from "react";
import { View, Text, TextInput, Button, FlatList, Pressable, StyleSheet } from "react-native";
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import { ToDoEntry } from "../shared/types/ToDoEntry";

const DummyData: ToDoEntry[] = [
  { id: 1, text: 'Learn TypeScript', done: true, creationDate: new Date("2025-10-01") },
  { id: 2, text: 'Build a ToDo App', done: false, creationDate: new Date("2025-10-01") },
  { id: 3, text: 'Test the App', done: false, creationDate: new Date("2025-10-01") },
  { id: 4, text: 'Learn CSS', done: false, creationDate: new Date("2025-10-01") },
];

const TodoItem = ({ item, onDelete }: any) => {
  const renderRightActions = () => (
    <View style={styles.deleteContainer}>
      <Text style={styles.deleteText}>Delete</Text>
    </View>
  );

  return (
    <ReanimatedSwipeable renderRightActions={renderRightActions} onSwipeableOpen={() => onDelete(item.id)}>
      <View style={styles.item}>
        <Text>{item.text}</Text>
      </View>
    </ReanimatedSwipeable>
  );
}


export default function App() {
  const [todos, setTodos] = useState<ToDoEntry[]>(DummyData);
  const [text, setText] = useState("");

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
      <TextInput
        value={text}
        onChangeText={setText}
        placeholder="New task"
        style={{ borderWidth: 1, marginBottom: 10, padding: 5 }}
      />
      <Button title="Add" onPress={addTodo} />
        <FlatList
          data={todos}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => 
            <View style={{ flexDirection: "row", gap: 5, alignContent:"flex-start", justifyContent: "space-between"}}>
              <TodoItem item={item} onDelete={deleteTodo} />
              {/* <Text>{item.text}</Text>
              <View style={{ flexDirection: "row", marginLeft: 30, alignContent: "center", justifyContent: "flex-end" }}>
                <Pressable onPress={() => checkTodo(item.id)}>
                  <Text>{item.done ? "✅" : "⬜"}</Text>
                </Pressable>
                <Pressable onPress={() => deleteTodo(item.id)}>
                  <Text>❌</Text>
                </Pressable>
              </View> */}
            </View>
          }/>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#fff',
    padding: 20,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  deleteContainer: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    flex: 1,
  },
  deleteText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
