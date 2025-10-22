import { useEffect, useState } from "react";
import { View, Text, TextInput, Button, FlatList, Pressable } from "react-native";
import { ToDoEntry } from "../shared/types/ToDoEntry";
//import { DummyData } from "../shared/dummyData/dummyData";

const DummyData: ToDoEntry[] = [
  { id: 1, text: 'Learn TypeScript', done: true },
  { id: 2, text: 'Build a ToDo App', done: false },
  { id: 3, text: 'Test the App', done: false },
  { id: 4, text: 'Learn CSS', done: false },
];

// const doneToString = (done: boolean): string => {
//   return done ? "Done" : "Not Done";
// }

export default function App() {
  const [todos, setTodos] = useState<ToDoEntry[]>(DummyData);
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
    setTodos([...todos, { id: todos.length+1, text, done: false }]);
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
              <Text >{item.text}</Text>
              <View style={{ flexDirection: "row", marginLeft: 30, alignContent: "center", justifyContent: "flex-end" }}>
                <Pressable onPress={() => checkTodo(item.id)}>
                  <Text>{item.done ? "✅" : "⬜"}</Text>
                </Pressable>
                <Pressable onPress={() => deleteTodo(item.id)}>
                  <Text>❌</Text>
                </Pressable>
              </View>
            </View>
          }/>
    </View>
  );
}
