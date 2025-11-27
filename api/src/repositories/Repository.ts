import { TodoEntryDTO } from "../models/todoDTO.js";

export interface Repository {
  getAll(): Promise<TodoEntryDTO[]>;
  get(id: string): Promise<TodoEntryDTO | null>;
  add(entry: TodoEntryDTO): Promise<TodoEntryDTO>;
  update(id: string, entry: TodoEntryDTO): Promise<TodoEntryDTO>;
}