import { View, Text, Pressable } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { styles } from "../styles/styles";
import { ToDoEntry } from "../../shared/types/ToDoEntry";


export default function UndoPopup({data, defaultText, onUndo}: any) {

  const UndoItem = ({ text, id }: { text: string, id: number  }) => {
    return (
      <View style={styles.fullScreenView}>
        <Text>{defaultText} {text}</Text>
        <Pressable onPress={() => onUndo(id)}>
          <Text style={{color: 'dodgerblue'}}>UNDO</Text>
        </Pressable>
      </View>
    );
  }

  return(
    <FlatList 
      data={data} 
      keyExtractor={item => item.id.toString()}
      contentContainerStyle={styles.undoList}
      renderItem={({ item }) => 
        <UndoItem text={item.text} id={item.id} />
      }
    />
  )
}