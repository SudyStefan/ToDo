import { useEffect, useRef } from "react";
import { Text, Pressable, Animated } from "react-native";
import { styles } from "../styles/styles";
import { wait } from "./InfoPopup";

export type UndoItemProp = {
  text: string;
  onUndo: Function;
  onTimeout: Function;
};

export const UndoItem = ({ text, onUndo, onTimeout }: UndoItemProp) => {
    const itemOpacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
      Animated.timing(itemOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true
      }).start();

      wait(3000)
        .then(() => Animated.timing(itemOpacity, {
                      toValue: 0,
                      duration: 1500,
                      useNativeDriver: true
                    }).start())
        .then(() => wait(1500))
        .then(() => onTimeout());
    }, []);

    return (
      <Animated.View 
      style={{ ...styles.item, ...styles.undoItem, opacity: itemOpacity }} 
      testID="UndoItem">
        <Text style={styles.itemText} numberOfLines={1}>MOVED '{text}'</Text>
        <Pressable onPress={() => onUndo()}>
          <Text style={{ ...styles.defaultText, color: 'dodgerblue' }}>UNDO</Text>
        </Pressable>
      </Animated.View>
    );
  }