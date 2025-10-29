import { useEffect, useRef } from "react";
import { View, Text, Pressable, Animated } from "react-native";
import { styles } from "../styles/styles";
import { wait } from "./Root";

type UndoItemProp = {
  text: string;
  id: number;
  onUndo: Function;
  onTimeout: Function;
};

export const UndoItem = ({ text, id, onUndo, onTimeout }: UndoItemProp) => {
    const itemOpacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
      Animated.timing(itemOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true
      }).start();

      wait(3000)
        .then(() => Animated.timing(itemOpacity, {
                      toValue: 0,
                      duration: 2000,
                      useNativeDriver: true
                    }).start())
        .then(() => wait(2000))
        .then(() => onTimeout());
    }, []);

    return (
      <Animated.View 
      style={{ ...styles.item, marginHorizontal: 20, borderBottomWidth: 0, opacity: itemOpacity }} 
      testID="UndoItem">
        <Text style={styles.itemText} numberOfLines={1}>MOVED '{text}'</Text>
        <Pressable onPress={() => onUndo()}>
          <Text style={{ ...styles.defaultText, color: 'dodgerblue' }}>UNDO</Text>
        </Pressable>
      </Animated.View>
    );
  }