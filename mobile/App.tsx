import { ToDoEntry } from "../shared/types/ToDoEntry";
import Root from "./components/Root";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const DummyData: ToDoEntry[] = [
  { id: 1, text: 'Learn TypeScript', done: true, creationDate: new Date("2025-10-01") },
  { id: 2, text: 'Build a ToDo App', done: false, creationDate: new Date("2025-10-01") },
  { id: 3, text: 'Test the App', done: false, creationDate: new Date("2025-10-01") },
  { id: 4, text: 'Learn CSS', done: false, creationDate: new Date("2025-10-01") },
  { id: 5, text: 'Read a book', done: true, creationDate: new Date("2025-10-01") },
  { id: 6, text: 'Go for a walk', done: false, creationDate: new Date("2025-10-01") },
  { id: 7, text: 'Write some code', done: false, creationDate: new Date("2025-10-01") },
  { id: 8, text: 'Watch a movie', done: true, creationDate: new Date("2025-10-01") },
  { id: 9, text: 'Cook dinner', done: false, creationDate: new Date("2025-10-01") },
  { id: 10, text: 'asdadsasdadsasdasdasdadasdasd', done: false, creationDate: new Date("2025-10-01") },
];

export default function App() {
  return (
    <GestureHandlerRootView testID="GestureRoot">
      <Root data={DummyData}/>
    </GestureHandlerRootView>
  );
}

