import { DummyData } from "../shared/dummyData/dummyData";
import Root from "./components/Root";
import { GestureHandlerRootView } from "react-native-gesture-handler";


export default function App() {
  return (
    <GestureHandlerRootView testID="GestureRoot">
      <Root data={DummyData}/>
    </GestureHandlerRootView>
  );
}

