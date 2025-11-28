import { FlatList } from "react-native";
import { TodoItem, TodoStatus, TodoType } from "../models/todoItem";
import { styles } from "../styles/styles";
import { TodoListItem } from "./TodoListItem";

export type DonePageProp = {
  data: TodoItem[];
  onUncheck: Function;
  onDelete: Function;
};

export const DonePage = ({data, onUncheck, onDelete}: DonePageProp) => {
  return (
    <FlatList
    data={data.filter(data => data.type === TodoType.SINGLE && data.status === TodoStatus.DONE)}
    keyExtractor={item => item.id}
    style={{flex: 1}}
    contentContainerStyle={styles.singleList}
    renderItem={({ item }) => 
      <TodoListItem 
      item={item} 
      onSwipe={onDelete} 
      onPress={onUncheck}
      swipeRight/>
    }/>
  );
}