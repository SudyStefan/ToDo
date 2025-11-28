import { TodoEntryDTO } from "../models/todoEntryDTO.js";

export interface Repository {
  name: string;
  getAll(): Promise<TodoEntryDTO[]>;
  get(id: string): Promise<TodoEntryDTO | null>;
  add(entry: TodoEntryDTO): Promise<TodoEntryDTO>;
  update(id: string, entry: TodoEntryDTO): Promise<TodoEntryDTO>;
}