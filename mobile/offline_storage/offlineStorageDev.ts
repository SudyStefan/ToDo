import { Todo } from "../types/todo";
import { OfflineStorage } from "./OfflineStorage";

class OfflineStorageDev implements OfflineStorage {
  public storeTodo = (todo: Todo): void => {
    try {
      localStorage.setItem(todo.id, JSON.stringify(todo));
    } catch (err) {
      console.log(`Error trying to store todo ${todo.id}:`, err);
    }
  }

  public storeAllTodos = (todos: Todo[]): void => {
    todos.forEach(todo => this.storeTodo(todo));
  }

  public fetchTodo = (id: string): Promise<Todo | null> => {
    const localResult = localStorage.getItem(id);
    const parsedJson = localResult ? JSON.parse(localResult) as Todo : null;

    return Promise.resolve(parsedJson ? { 
      ...parsedJson,
      creationDate: new Date(parsedJson.creationDate),
      ...(parsedJson.lastChecked && { lastChecked: new Date(parsedJson.lastChecked) })
     } : null);
  }

  public fetchAllTodos = (): Promise<Todo[] | never[]> => {
    const keys = [...Array(localStorage.length).keys()].map(keyIndex => {
      return localStorage.key(keyIndex)!;
    });

    return Promise.all(keys.map(key => this.fetchTodo(key)))
      .then(todos => todos.filter(todo => todo !== null))
      .catch(err => {
        console.warn("Could not fetch local data:", err);
        return [];
      });
  }
}

export const offlineStorageDev = new OfflineStorageDev();