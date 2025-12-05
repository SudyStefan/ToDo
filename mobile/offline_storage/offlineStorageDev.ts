import { Todo } from "../types/todo";
import { OfflineStorage } from "./OfflineStorage";
import { offlineStorageLive } from "./offlineStorageLive";

class OfflineStorageDev implements OfflineStorage {
  public storeTodo = (todo: Todo): void => {
    try {
      localStorage.setItem(todo.id, JSON.stringify(todo));
    } catch (err) {
      console.log(`Error trying to store todo ${todo.id}:`, err);
    }
    
    offlineStorageLive.storeTodo(todo)
  }

  public storeAllTodos = (todos: Todo[]): void => {
    todos.forEach(todo => this.storeTodo(todo));

    offlineStorageLive.storeAllTodos(todos);
  }

  public fetchTodo = (id: string): Promise<Todo | null> => {
    offlineStorageLive.fetchTodo(id)
      .catch(err => console.warn(`Couldn't fetch ${id} from internal:`, err));

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

    offlineStorageLive.fetchAllTodos()
      .then(res => console.info("Successfully fetched from internal:", res))
      .catch(err => console.warn("Couldn't fetch internal:", err));

    return Promise.all(keys.map(key => this.fetchTodo(key)))
      .then(todos => todos.filter(todo => todo !== null))
      .catch(err => {
        console.warn("Could not fetch local data:", err);
        return [];
      });
  }
}

export const offlineStorageDev = new OfflineStorageDev();