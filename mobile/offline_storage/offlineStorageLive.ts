import { Todo } from "../types/todo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { OfflineStorage } from "./OfflineStorage";

class OfflineStorageLive implements OfflineStorage {
  public upsertTodo = (todo: Todo): void => {
    AsyncStorage.setItem(todo.id, JSON.stringify(todo)).catch((err) =>
      console.error(`Error trying to store todo ${todo.id}:`, err),
    );
  };

  public upsertAllTodos = (todos: Todo[]): void => {
    todos.forEach((todo) => this.upsertTodo(todo));
  };

  public fetchTodo = (id: string): Promise<Todo | null> => {
    return AsyncStorage.getItem(id)
      .then((jsonTodo) => {
        const todo = jsonTodo ? (JSON.parse(jsonTodo) as Todo) : null;
        return todo
          ? {
              ...todo,
              creationDate: new Date(todo.creationDate),
              ...(todo.lastChecked && {
                lastChecked: new Date(todo.lastChecked),
              }),
            }
          : null;
      })
      .catch((err) => {
        console.error(`Error trying to fetch todo ${id}:`, err);
        return null;
      });
  };

  public fetchAllTodos = (): Promise<Todo[] | never[]> => {
    return AsyncStorage.getAllKeys()
      .then((keys) =>
        Promise.all(keys.map((key) => this.fetchTodo(key))).then((todos) =>
          todos.filter((todo) => todo !== null),
        ),
      )
      .catch((err) => {
        console.warn("Could not fetch offline data:", err);
        return [];
      });
  };
}

export const offlineStorageLive = new OfflineStorageLive();
