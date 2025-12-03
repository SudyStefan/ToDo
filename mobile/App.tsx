import { useEffect, useState } from "react";
import { Root } from "./components/Root";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { TodoItem } from "./types/todoItem";
import { ActivityIndicator, View, Text } from "react-native";
import { todoService } from "./service/todoService";
import { OfflineStorage } from "./offline_storage/OfflineStorage";
import { offlineStorageDev } from "./offline_storage/offlineStorageDev";
//import { offlineStorageLive } from "./offline_storage/offlineStorageLive";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [offlineToggle, setOfflineToggle] = useState(false);

  useEffect(() => {
    //const storage: OfflineStorage = offlineStorageLive // internal storage (AsyncStorage)
    const storage: OfflineStorage = offlineStorageDev; // local storage + internal storage (calls offlineStorageLive)
    todoService.fetchTodos()
      .then(fetchedTodos => {
        setTodos(fetchedTodos);
        storage.storeAllTodos(fetchedTodos);
      })
      .catch(err => {
        console.warn("Failed to fetch on startup, swaping to offline mode.");
        return storage.fetchAllTodos()
          .then(readTodos => setTodos(readTodos))
          .catch((err) => {
            throw err;
          })
          .finally(() => setOfflineToggle(true));
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
      <Root todos={todos} setTodos={setTodos} offline={offlineToggle} />
    </GestureHandlerRootView>
  );
}

