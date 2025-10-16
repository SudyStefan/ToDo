import { useEffect, useState } from "react";
import { View, Text, TextInput, Button, FlatList } from "react-native";
import { ToDoEntry } from "../shared/types/ToDoEntry";
//import { DummyData } from "../shared/dummyData/dummyData";

const DummyData: ToDoEntry[] = [
  { id: 1, text: 'Learn TypeScript', done: true },
  { id: 2, text: 'Build a ToDo App', done: false },
  { id: 3, text: 'Test the App', done: false },
  { id: 4, text: 'Learn CSS', done: false },
];

export default function App() {
  const [todos, setTodos] = useState<ToDoEntry[]>([]);
  const [text, setText] = useState("");

  const API_URL = "http://192.168.0.208:4000/todo";

  useEffect(() => {
    fetch(API_URL).then(res => res.json()).then(setTodos);
  }, []);

  // const addTodo = async () => {
  //   const res = await fetch(API_URL, {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ text }),
  //   });
  //   const newTodo: ToDoEntry = await res.json();
  //   setTodos([...todos, newTodo]);
  //   setText("");
  // };

  const addTodo = () => {
    DummyData.push({ id: DummyData.length+1, text, done: false });
    setText("");
  }

  const checkTodo = (id: number) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, done: !todo.done } : todo));
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
          data={DummyData}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => 
            <View style={{ flexDirection: "row", gap: 5, alignContent: "center", justifyContent: "center" }}>
              <Text>{item.text}</Text>
              <Button title={item.done.toString()} onPress={() => checkTodo(item.id)} />
            </View>}
        />
    </View>
  );
}
