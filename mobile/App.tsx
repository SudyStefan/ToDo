import { useEffect, useState } from "react";
import { Root } from "./components/Root";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { TodoItem } from "./models/todoItem";
import { ActivityIndicator, View, Text } from "react-native";
import { TodoService } from "./service/todoService";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [todos, setTodos] = useState<TodoItem[]>([]);

  useEffect(() => {
    TodoService.getTodos()
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

