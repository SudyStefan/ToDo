import { ToDoEntry, ToDoStatus, ToDoType, TimeInSeconds } from "../types/ToDoEntry.js";

export const DummyData: ToDoEntry[] = [
  { id: 0, text: 'Learn TypeScript', status: ToDoStatus.Open, creationDate: new Date("2025-10-01"), type: ToDoType.Single, deleted: false },
  { id: 1, text: 'Build a ToDo App', status: ToDoStatus.Open, creationDate: new Date("2025-10-01"), type: ToDoType.Single, deleted: false },
  { id: 2, text: 'Test the App', status: ToDoStatus.Open, creationDate: new Date("2025-10-01"), type: ToDoType.Single, deleted: false },
  { id: 3, text: 'Learn CSS', status: ToDoStatus.Open, creationDate: new Date("2025-10-01"), type: ToDoType.Single, deleted: false },
  { id: 4, text: 'Read a book', status: ToDoStatus.Open, creationDate: new Date("2025-10-01"), type: ToDoType.Single, deleted: false },
  { id: 5, text: 'Go for a walk', status: ToDoStatus.Open, creationDate: new Date("2025-10-01"), type: ToDoType.Single, deleted: false },
  { id: 6, text: 'Write some code', status: ToDoStatus.Open, creationDate: new Date("2025-10-01"), type: ToDoType.Single, deleted: false },
  { id: 7, text: 'Watch a movie', status: ToDoStatus.Deleted, creationDate: new Date("2025-10-01"), type: ToDoType.Single, deleted: false },
  { id: 8, text: 'Cook dinner', status: ToDoStatus.Done, creationDate: new Date("2025-10-01"), type: ToDoType.Single, deleted: false },
  { id: 9, text: 'asdadsasdadsasdasdasdadasdasd', status: ToDoStatus.Done, creationDate: new Date("2025-10-01"), type: ToDoType.Single, deleted: false },
  
  { id: 10, text: 'Küche', status: ToDoStatus.Done, creationDate: new Date("2025-10-01"), type: ToDoType.Periodic, lastChecked: new Date("2025-10-20"), period: TimeInSeconds.Week * 2, deleted: false },
  { id: 11, text: 'Dusche', status: ToDoStatus.Done, creationDate: new Date("2025-10-01"), type: ToDoType.Periodic, lastChecked: new Date("2025-10-20"), period: TimeInSeconds.Week * 3, deleted: false },
  { id: 12, text: 'Klo', status: ToDoStatus.Done, creationDate: new Date("2025-10-01"), type: ToDoType.Periodic, lastChecked: new Date("2025-10-20"), period: TimeInSeconds.Week, deleted: false },
  { id: 13, text: 'Gang', status: ToDoStatus.Done, creationDate: new Date("2025-10-01"), type: ToDoType.Periodic, lastChecked: new Date("2025-10-20"), period: TimeInSeconds.Week * 4, deleted: false },
];