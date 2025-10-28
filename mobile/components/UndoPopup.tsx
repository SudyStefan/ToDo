import { View, Text, Pressable } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { styles } from "../styles/styles";
import { ToDoEntry } from "../../shared/types/ToDoEntry";

type UndoProp = {
  data: ToDoEntry[], 
  defaultText: string, 
  onUndo: Function, 
  timeout?: number
}

export default function UndoPopup({data, defaultText, onUndo, timeout = 5000}: UndoProp) {

  const UndoItem = ({ text, id }: { text: string, id: number  }) => {
    return (
      <View style={styles.item} testID="UndoItem">
        <Text style={styles.itemText}>{defaultText} {text}</Text>
        <Pressable onPress={() => onUndo(id)}>
          <Text style={{color: 'dodgerblue'}}>UNDO</Text>
        </Pressable>
      </View>
    );
  }

  return(
      <FlatList testID="UndoPopup"
        data={data} 
        style={styles.fullScreenView}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.undoList}
        renderItem={({ item }) => 
          <UndoItem text={item.text} id={item.id} />
        }
      />
  )
}

