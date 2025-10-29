import { View, Text, Pressable, Animated, AnimatableNumericValue } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { styles } from "../styles/styles";
import { Status, ToDoEntry } from "../../shared/types/ToDoEntry";
import { useEffect } from "react";

type UndoProp = {
  data: ToDoEntry[], 
  onUndo: Function, 
  fadeOpacity?: any,
}

export default function UndoPopup({data, onUndo, fadeOpacity}: UndoProp) {
  useEffect(() => {
    if(data && data.length > 0) {
      Animated.timing(fadeOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true
      }).start();
    }
  }, [data]);


  const UndoItem = ({ text, id }: { text: string, id: number }) => {
    return (
      <View 
      style={{ ...styles.item, marginHorizontal: 20, borderBottomWidth: 0}} 
      testID="UndoItem">
        <Text style={styles.itemText} numberOfLines={1}>MOVED '{text}'</Text>
        <Pressable onPress={() => onUndo(id)}>
          <Text style={{ ...styles.defaultText, color: 'dodgerblue' }}>UNDO</Text>
        </Pressable>
      </View>
    );
  }

  return(
    <Animated.View 
    style={{ ...styles.undoView, opacity: fadeOpacity }} 
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
    </Animated.View>
  )
}

