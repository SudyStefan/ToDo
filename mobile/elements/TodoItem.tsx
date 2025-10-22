import React from 'react';
import { View, Text, Pressable, StyleSheet } from "react-native";
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import { styles } from "../styles/styles";

export const TodoItem = ({ item, onPress, onDelete }: any) => {
  const renderRightActions = () => (
    <View style={styles.deleteContainer}>
      <Text style={styles.deleteText}>REMOVE</Text>
    </View>
  );

  return (
    <Swipeable renderRightActions={renderRightActions} onSwipeableOpen={() => onDelete(item.id)} containerStyle={{ width: '100%' }}>
      <View style={styles.item}>
        <Text>{item.text}</Text>
        <Pressable onPress={() => onPress(item.id)} style={{marginLeft: 40}}>
          <Text style={styles.pressableText}>{item.done ? "✅" : "⬜"}</Text>
        </Pressable>
      </View>
    </Swipeable>
  );
}