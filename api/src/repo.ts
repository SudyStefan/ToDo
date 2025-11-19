import { DummyData } from "../../shared/dummyData/dummyData.js";
import { ToDoEntry, ToDoType } from "../../shared/types/ToDoEntry.js";

class ToDoRepo {
  private entries: ToDoEntry[] = DummyData;

  get(): ToDoEntry[] {
    return this.entries;
  }

  add(newEntry: ToDoEntry): void {
    this.entries.push(newEntry);
  }

  remove(id: number): void {
    this.entries = this.entries.filter(entry => entry.id !== id);
  }

  update(updatedEntry: ToDoEntry): void {
    this.entries = this.entries.map(entry => {
      if (entry.id === updatedEntry.id) {
        return updatedEntry;
      } else {
        return entry;
      }
    });
  }
}

export const toDoRepo = new ToDoRepo();
