import { ToDoEntry, ToDoStatus, ToDoType, TimeInSeconds } from "../types/ToDoEntry.js";

export const DummyData: ToDoEntry[] = [
  { text: 'Learn TypeScript', status: ToDoStatus.Open, creationDate: new Date("2025-10-01"), type: ToDoType.Single, deleted: false },
  { text: 'Build a ToDo App', status: ToDoStatus.Open, creationDate: new Date("2025-10-01"), type: ToDoType.Single, deleted: false },
  { text: 'Test the App', status: ToDoStatus.Open, creationDate: new Date("2025-10-01"), type: ToDoType.Single, deleted: false },
  { text: 'Learn CSS', status: ToDoStatus.Open, creationDate: new Date("2025-10-01"), type: ToDoType.Single, deleted: false },
  { text: 'Read a book', status: ToDoStatus.Open, creationDate: new Date("2025-10-01"), type: ToDoType.Single, deleted: false },
  { text: 'Go for a walk', status: ToDoStatus.Open, creationDate: new Date("2025-10-01"), type: ToDoType.Single, deleted: false },
  { text: 'Write some code', status: ToDoStatus.Open, creationDate: new Date("2025-10-01"), type: ToDoType.Single, deleted: false },
  { text: 'Watch a movie', status: ToDoStatus.Deleted, creationDate: new Date("2025-10-01"), type: ToDoType.Single, deleted: false },
  { text: 'Cook dinner', status: ToDoStatus.Done, creationDate: new Date("2025-10-01"), type: ToDoType.Single, deleted: false },
  { text: 'asdadsasdadsasdasdasdadasdasd', status: ToDoStatus.Done, creationDate: new Date("2025-10-01"), type: ToDoType.Single, deleted: false },
  
  { text: 'Küche', status: ToDoStatus.Done, creationDate: new Date("2025-10-01"), type: ToDoType.Periodic, lastChecked: new Date("2025-10-20"), period: TimeInSeconds.Week * 2, deleted: false },
  { text: 'Dusche', status: ToDoStatus.Done, creationDate: new Date("2025-10-01"), type: ToDoType.Periodic, lastChecked: new Date("2025-10-20"), period: TimeInSeconds.Week * 3, deleted: false },
  { text: 'Klo', status: ToDoStatus.Done, creationDate: new Date("2025-10-01"), type: ToDoType.Periodic, lastChecked: new Date("2025-10-20"), period: TimeInSeconds.Week, deleted: false },
  { text: 'Gang', status: ToDoStatus.Done, creationDate: new Date("2025-10-01"), type: ToDoType.Periodic, lastChecked: new Date("2025-10-20"), period: TimeInSeconds.Week * 4, deleted: false },
];