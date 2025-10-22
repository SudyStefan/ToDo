import { ToDoEntry } from "../shared/types/ToDoEntry";
import ToDo from "./elements/ToDo";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const DummyData: ToDoEntry[] = [
  { id: 1, text: 'Learn TypeScript', done: true, creationDate: new Date("2025-10-01") },
  { id: 2, text: 'Build a ToDo App', done: false, creationDate: new Date("2025-10-01") },
  { id: 3, text: 'Test the App', done: false, creationDate: new Date("2025-10-01") },
  { id: 4, text: 'Learn CSS', done: false, creationDate: new Date("2025-10-01") },
];

export default function App() {
  return (
    <GestureHandlerRootView>
      <ToDo data={DummyData}/>
    </GestureHandlerRootView>
  );
}

