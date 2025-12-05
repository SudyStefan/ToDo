import { Todo } from "../types/todo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { OfflineStorage } from "./OfflineStorage";

class OfflineStorageLive implements OfflineStorage {
  public storeTodo = (todo: Todo): void => {
    AsyncStorage.setItem(todo.id, JSON.stringify(todo)).catch((err) =>
      console.error(`Error trying to store todo ${todo.id}:`, err),
    );
  };

  public storeAllTodos = (todos: Todo[]): void => {
    todos.forEach((todo) => this.storeTodo(todo));
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
