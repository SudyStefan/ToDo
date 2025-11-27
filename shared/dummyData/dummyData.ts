import { ToDoEntry, ToDoStatus, ToDoType, TimeInSeconds } from "../types/ToDoEntry.js";

export const DummyData: ToDoEntry[] = [
  { id: '1', text: 'Learn TypeScript', status: ToDoStatus.Open, creationDate: new Date("2025-10-01"), type: ToDoType.Single },
  { id: '2', text: 'Build a ToDo App', status: ToDoStatus.Open, creationDate: new Date("2025-10-01"), type: ToDoType.Single },
  { id: '3', text: 'Test the App', status: ToDoStatus.Open, creationDate: new Date("2025-10-01"), type: ToDoType.Single },
  { id: '4', text: 'Learn CSS', status: ToDoStatus.Open, creationDate: new Date("2025-10-01"), type: ToDoType.Single },
  { id: '5', text: 'Read a book', status: ToDoStatus.Open, creationDate: new Date("2025-10-01"), type: ToDoType.Single },
  { id: '6', text: 'Go for a walk', status: ToDoStatus.Open, creationDate: new Date("2025-10-01"), type: ToDoType.Single },
  { id: '7', text: 'Write some code', status: ToDoStatus.Open, creationDate: new Date("2025-10-01"), type: ToDoType.Single },
  { id: '8', text: 'Watch a movie', status: ToDoStatus.Deleted, creationDate: new Date("2025-10-01"), type: ToDoType.Single },
  { id: '9', text: 'Cook dinner', status: ToDoStatus.Done, creationDate: new Date("2025-10-01"), type: ToDoType.Single },
  { id: '10', text: 'asdadsasdadsasdasdasdadasdasd', status: ToDoStatus.Done, creationDate: new Date("2025-10-01"), type: ToDoType.Single },
  
  { id: '11', text: 'Küche', status: ToDoStatus.Done, creationDate: new Date("2025-10-01"), type: ToDoType.Periodic, lastChecked: new Date("2025-10-20"), periodSeconds: TimeInSeconds.Week * 2 },
  { id: '12', text: 'Dusche', status: ToDoStatus.Done, creationDate: new Date("2025-10-01"), type: ToDoType.Periodic, lastChecked: new Date("2025-10-20"), periodSeconds: TimeInSeconds.Week * 3 },
  { id: '13', text: 'Klo', status: ToDoStatus.Done, creationDate: new Date("2025-10-01"), type: ToDoType.Periodic, lastChecked: new Date("2025-10-20"), periodSeconds: TimeInSeconds.Week },
  { id: '14', text: 'Gang', status: ToDoStatus.Done, creationDate: new Date("2025-10-01"), type: ToDoType.Periodic, lastChecked: new Date("2025-10-20"), periodSeconds: TimeInSeconds.Week * 4 },
];