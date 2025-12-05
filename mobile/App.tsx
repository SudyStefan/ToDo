import { useEffect, useState } from "react";
import { Root } from "./components/Root";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Todo } from "./types/todo";
import { ActivityIndicator, View, Text, Platform } from "react-native";
import { todoService } from "./services/todoService";
import { OfflineStorage } from "./offline_storage/OfflineStorage";
import { offlineStorageDev } from "./offline_storage/offlineStorageDev";
import { offlineStorageLive } from "./offline_storage/offlineStorageLive";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [onlineToggle, setOnlineToggle] = useState(false);

  useEffect(() => {
    const storage: OfflineStorage = Platform.OS === 'web' ? offlineStorageDev : offlineStorageLive;
    todoService.fetchTodos()
      .then(fetchedTodos => {
        setTodos(fetchedTodos);
        storage.storeAllTodos(fetchedTodos);
        setOnlineToggle(true);
      })
      .catch(() => {
        console.warn("Failed to fetch on startup, swaping to offline mode.");
        return storage.fetchAllTodos()
          .then(readTodos => setTodos(readTodos))
          .catch((err) => {
            console.error("Failed to get from local storage on startup.");
            throw err;
          })
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
    <GestureHandlerRootView>
      <Root todos={todos} setTodos={setTodos} online={onlineToggle} />
    </GestureHandlerRootView>
  );
}

