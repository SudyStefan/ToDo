import React from 'react';
import { View, Text, Pressable, StyleSheet, Dimensions } from "react-native";
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import { styles, colors } from "../styles/styles";
import Ionicons from '@expo/vector-icons/Ionicons'
import { ToDoEntry, ToDoStatus } from '../../shared/types/ToDoEntry';

type TodoItemProp = {
  item: ToDoEntry,
  onPress: Function,
  onSwipe: Function,
  swipeLeft?: boolean
  swipeRight?: boolean
}

export const ToDoItem = ({ item, onPress, onSwipe, swipeLeft = false, swipeRight = false}: TodoItemProp) => {
  const renderActions = (text: string) => (
    <View style={styles.deleteContainer}>
      <Text style={styles.deleteText}>{text}</Text>
    </View>
  );

  return (
    <Swipeable 
    renderLeftActions={swipeLeft ? () => renderActions("CHECK") : undefined}
    dragOffsetFromLeftEdge={swipeLeft ? undefined : Number.MAX_VALUE}
    renderRightActions={swipeRight ? () => renderActions("DELETE") : undefined}
    dragOffsetFromRightEdge={swipeRight ? undefined : Number.MAX_VALUE}
    onSwipeableOpen={() => onSwipe(item.id)} 
    childrenContainerStyle={styles.item}
    testID="TodoItem">
      <Text style={styles.itemText} numberOfLines={1}>{item.text}</Text>
      <Pressable onPress={() => onPress(item.id)}>
        <Ionicons 
        name={item.status === ToDoStatus.Done ? "checkmark-circle" : "ellipse-outline"} 
        size={Dimensions.get('window').height * 0.06} 
        color={item.status === ToDoStatus.Done ? colors.seattlegreen : colors.soxred} />
      </Pressable>
    </Swipeable>
  );
}