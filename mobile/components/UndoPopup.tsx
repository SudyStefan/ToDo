import { View, Text, Pressable } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { styles } from "../styles/styles";
import { ToDoEntry } from "../../shared/types/ToDoEntry";
import { useEffect, useState } from "react";

type UndoProp = {
  data: ToDoEntry[], 
  defaultText: string, 
  onUndo: Function, 
  timeout?: number
}

export default function UndoPopup({data, defaultText, onUndo, timeout = 5000}: UndoProp) {
  const [active, setActive] = useState<boolean>(false);

  useEffect(() => {
    if (data.length > 0) {
      setActive(true);
      //To implement: remove items after 'timeout' milliseconds (currently only hides view)
      const t = setTimeout(() => { setActive(false);  }, timeout);
      return () => clearTimeout(t);
    }
    //setActive(true);
  }, [data]);

  const UndoItem = ({ text, id }: { text: string, id: number  }) => {
    return (
      <View style={{ ...styles.item, marginHorizontal: 20, borderBottomWidth: 0 }} testID="UndoItem">
        <Text style={styles.itemText} numberOfLines={1}>{defaultText} {text}</Text>
        <Pressable onPress={() => onUndo(id)}>
          <Text style={{ ...styles.defaultText, color: 'dodgerblue' }}>UNDO</Text>
        </Pressable>
      </View>
    );
  }

  return(
    <View 
      style={{ ...styles.fullScreenView, justifyContent: 'center' }} 
      pointerEvents={active ? 'auto' : 'none'} 
      testID="UndoPopupView">
      <FlatList
        testID="UndoList"
        data={data} 
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.undoList}
        renderItem={({ item }) => 
          <UndoItem text={item.text} id={item.id} />
        }
      />
    </View>
  )
}

