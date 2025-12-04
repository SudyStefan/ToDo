import { TodoItem } from "../types/todoItem";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { OfflineStorage } from "./OfflineStorage";

class OfflineStorageLive implements OfflineStorage {
  public storeTodo = (todo: TodoItem): void => {
    AsyncStorage.setItem(todo.id, JSON.stringify(todo))
      .catch(err => console.error(`Error trying to store todo ${todo.id}:`, err));
  }

  public storeAllTodos = (todos: TodoItem[]): void => {
    todos.forEach(todo => this.storeTodo(todo));
  }

  public fetchTodo = (id: string): Promise<TodoItem | null> => {
    return AsyncStorage.getItem(id)
      .then(jsonTodo => {
        const todo = jsonTodo ? JSON.parse(jsonTodo) as TodoItem : null;
        return todo ? {
          ...todo,
          creationDate: new Date(todo.creationDate),
          ...(todo.lastChecked && { lastChecked: new Date(todo.lastChecked) })
        } : null;
      })
      .catch(err => {
      console.error(`Error trying to fetch todo ${id}:`, err);
      return null;
      });
  }

  public fetchAllTodos = (): Promise<TodoItem[] | never[]> => {
    return AsyncStorage.getAllKeys()
      .then(keys => Promise.all(keys.map(key => this.fetchTodo(key)))
        .then(todos => todos.filter(todo => todo !== null)))
      .catch(err => {
        console.warn("Could not fetch offline data:", err);
        return [];
      });
  };
}

export const offlineStorageLive = new OfflineStorageLive();