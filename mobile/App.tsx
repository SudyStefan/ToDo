import { useEffect, useState } from "react";
import Root from "./components/Root";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ToDoEntry } from "../shared/types/ToDoEntry";
import { ActivityIndicator, View, Text } from "react-native";
import axios from "axios";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [todos, setTodos] = useState<ToDoEntry[]>([]);

  useEffect(() => {
    console.log("Fetching data");
    initialFetch();
  }, []);

  const initialFetch = async () => {
    try {
      const response = await axios.get("http://localhost:4000/todo");
      setTodos(response.data as ToDoEntry[]);
    } finally {
      setLoading(false);
    }
  };

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

