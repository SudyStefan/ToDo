import { useEffect, useState } from "react";
import { View, Text, TextInput, Button, FlatList, Pressable, StyleSheet } from "react-native";
import { ToDoEntry } from "../../shared/types/ToDoEntry";
import { styles } from "../styles/styles";
import { TodoItem } from "../elements/TodoItem";
import { AddView } from "../elements/AddView";


export default function ToDo({data, API_URL}: {data: ToDoEntry[], API_URL?: string}) {

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

  const [todos, setTodos] = useState<ToDoEntry[]>(data);
  const [text, setText] = useState("");
  const [addViewVisible, setAddViewVisible] = useState(false);
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