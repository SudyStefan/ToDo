import { Todo } from "../types/todo";

export interface OfflineStorage {
  storeTodo(todo: Todo): void;
  storeAllTodos(todos: Todo[]): void;
  fetchTodo(id: string): Promise<Todo | null>;
  fetchAllTodos(): Promise<Todo[] | never[]>;
}