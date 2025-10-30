import { ToDoEntry, Status, Type, TimeInSeconds } from "../types/ToDoEntry";

export const DummyData: ToDoEntry[] = [
  { id: 1, text: 'Learn TypeScript', status: Status.Open, creationDate: new Date("2025-10-01"), type: Type.Single },
  { id: 2, text: 'Build a ToDo App', status: Status.Open, creationDate: new Date("2025-10-01"), type: Type.Single },
  { id: 3, text: 'Test the App', status: Status.Open, creationDate: new Date("2025-10-01"), type: Type.Single },
  { id: 4, text: 'Learn CSS', status: Status.Open, creationDate: new Date("2025-10-01"), type: Type.Single },
  { id: 5, text: 'Read a book', status: Status.Open, creationDate: new Date("2025-10-01"), type: Type.Single },
  { id: 6, text: 'Go for a walk', status: Status.Open, creationDate: new Date("2025-10-01"), type: Type.Single },
  { id: 7, text: 'Write some code', status: Status.Open, creationDate: new Date("2025-10-01"), type: Type.Single },
  { id: 8, text: 'Watch a movie', status: Status.Deleted, creationDate: new Date("2025-10-01"), type: Type.Single },
  { id: 9, text: 'Cook dinner', status: Status.Done, creationDate: new Date("2025-10-01"), type: Type.Single },
  { id: 10, text: 'asdadsasdadsasdasdasdadasdasd', status: Status.Done, creationDate: new Date("2025-10-01"), type: Type.Single },
  
  { id: 11, text: 'Küche', status: Status.Done, creationDate: new Date("2025-10-01"), type: Type.Periodic, lastChecked: new Date("2025-10-20"), period: TimeInSeconds.Week * 2 },
  { id: 12, text: 'Dusche', status: Status.Done, creationDate: new Date("2025-10-01"), type: Type.Periodic, lastChecked: new Date("2025-10-20"), period: TimeInSeconds.Week * 3 },
  { id: 13, text: 'Klo', status: Status.Done, creationDate: new Date("2025-10-01"), type: Type.Periodic, lastChecked: new Date("2025-10-20"), period: TimeInSeconds.Week },
  { id: 14, text: 'Gang', status: Status.Done, creationDate: new Date("2025-10-01"), type: Type.Periodic, lastChecked: new Date("2025-10-20"), period: TimeInSeconds.Week * 4 },
];