import { ToDoEntry, Status } from "../types/ToDoEntry";

export const DummyData: ToDoEntry[] = [
  { id: 1, text: 'Learn TypeScript', status: Status.Open, creationDate: new Date("2025-10-01") },
  { id: 2, text: 'Build a ToDo App', status: Status.Open, creationDate: new Date("2025-10-01") },
  { id: 3, text: 'Test the App', status: Status.Open, creationDate: new Date("2025-10-01") },
  { id: 4, text: 'Learn CSS', status: Status.Open, creationDate: new Date("2025-10-01") },
  { id: 5, text: 'Read a book', status: Status.Open, creationDate: new Date("2025-10-01") },
  { id: 6, text: 'Go for a walk', status: Status.Open, creationDate: new Date("2025-10-01") },
  { id: 7, text: 'Write some code', status: Status.Open, creationDate: new Date("2025-10-01") },
  { id: 8, text: 'Watch a movie', status: Status.Deleted, creationDate: new Date("2025-10-01") },
  { id: 9, text: 'Cook dinner', status: Status.Done, creationDate: new Date("2025-10-01") },
  { id: 10, text: 'asdadsasdadsasdasdasdadasdasd', status: Status.Done, creationDate: new Date("2025-10-01") },
];