import React from 'react';
import { View, Text, Pressable, StyleSheet, Dimensions } from "react-native";
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import { styles, colors } from "../styles/styles";
import Ionicons from '@expo/vector-icons/Ionicons'
import { ToDoEntry } from '../../shared/types/ToDoEntry';

type TodoItemProp = {
  item: ToDoEntry,
  onPress: Function,
  onDelete: Function
}

export const TodoItem = ({ item, onPress, onDelete }: TodoItemProp) => {
  const renderRightActions = () => (
    <View style={styles.deleteContainer}>
      <Text style={styles.deleteText}>REMOVE</Text>
    </View>
  );

  return (
    <Swipeable 
    renderRightActions={renderRightActions} 
    onSwipeableOpen={() => onDelete(item.id)} 
    containerStyle={{ width: '100%' }} 
    testID="TodoItem">
      <View style={styles.item}>
        <Text style={styles.itemText} numberOfLines={1}>{item.text}</Text>
        <Pressable onPress={() => onPress(item.id)}>
          <Ionicons 
          name={item.done ? "checkmark-circle" : "ellipse-outline"} 
          size={Dimensions.get('window').height * 0.06} 
          color={item.done ? colors.seattlegreen : colors.soxred} />
        </Pressable>
      </View>
    </Swipeable>
  );
}