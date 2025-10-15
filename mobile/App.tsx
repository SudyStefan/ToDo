import { useEffect, useState } from "react";
import { View, Text, TextInput, Button, FlatList } from "react-native";
import { ToDoEntry } from "../shared/types/ToDoEntry.js";

export default function App() {
  const [todos, setTodos] = useState<ToDoEntry[]>([]);
  const [text, setText] = useState("");

  const API_URL = "http://192.168.0.208:4000/todo";

  useEffect(() => {
    fetch(API_URL).then(res => res.json()).then(setTodos);
  }, []);

  const addTodo = async () => {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    const newTodo: ToDoEntry = await res.json();
    setTodos([...todos, newTodo]);
    setText("");
  };

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
        renderItem={({ item }) => <Text>{item.text}</Text>}
      />
    </View>
  );
}
