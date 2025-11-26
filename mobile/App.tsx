import { useEffect, useState } from "react";
import { Root } from "./components/Root";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ToDoEntry } from "../shared/types/ToDoEntry";
import { ActivityIndicator, View, Text } from "react-native";
import { ToDoService } from "./service/ToDoService";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [todos, setTodos] = useState<ToDoEntry[]>([]);

  useEffect(() => {
    ToDoService.getTodos()
      .then(fetchedTodos => setTodos(fetchedTodos))
      .catch(() => {
        console.error("Failed to fetch on startup, swaping to offline mode!");
      })
      .finally(() => setLoading(false));
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

