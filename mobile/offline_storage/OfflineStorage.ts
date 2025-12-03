import { TodoItem } from "../types/todoItem";

export interface OfflineStorage {
  storeTodo(todo: TodoItem): void;
  storeAllTodos(todos: TodoItem[]): void;
  fetchTodo(id: string): Promise<TodoItem | null>;
  fetchAllTodos(): Promise<TodoItem[] | never[]>;
}