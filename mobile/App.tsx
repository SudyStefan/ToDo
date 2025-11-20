import { useEffect, useState } from "react";
import Root from "./components/Root";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ToDoEntry } from "../shared/types/ToDoEntry";
import { ActivityIndicator, View, Text } from "react-native";
import { getToDos } from "./service/ToDoService";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [todos, setTodos] = useState<ToDoEntry[]>([]);

  useEffect(() => {
    getToDos()
      .then(fetchedTodos => setTodos(fetchedTodos))
      .catch(err => console.error("Error fetching todos:", err))
      .finally(() => {
        console.log(`Fetched ${todos.length} todos`);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
        <Text>Loading...</Text>
      </View>
    );
  }
  return (
    <GestureHandlerRootView testID="GestureRoot">
      <Root todos={todos} setTodos={setTodos}/>
    </GestureHandlerRootView>
  );
}

