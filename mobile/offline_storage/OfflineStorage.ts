import { Todo } from "../types/todo";

export interface OfflineStorage {
  upsertTodo(todo: Todo): void;
  upsertAllTodos(todos: Todo[]): void;
  fetchTodo(id: string): Promise<Todo | null>;
  fetchAllTodos(): Promise<Todo[] | never[]>;
}
