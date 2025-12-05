import { FlatList } from "react-native";
import { Todo, TodoStatus, TodoType } from "../types/todo";
import { styles } from "../styles/styles";
import { PeriodicItem } from "./PeriodicItem";

export type PeriodicPageProp = {
  data: Todo[];
  onCheck: Function;
  onDelete: Function;
};

export const PeriodicPage = ({data, onCheck, onDelete}: PeriodicPageProp) => {
  return (
    <FlatList
    data={data.filter(data => data.status !== TodoStatus.DELETED && data.type === TodoType.PERIODIC)}
    keyExtractor={item => item.id}
    contentContainerStyle={styles.periodicList}
    renderItem={({ item }) => 
      <PeriodicItem 
      item={item} 
      onSwipe={onCheck} 
      onPress={onCheck} />
    }/>
  );
}