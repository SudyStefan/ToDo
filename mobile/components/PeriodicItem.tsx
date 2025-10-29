import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Pressable, StyleSheet, Dimensions, Animated } from "react-native";
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import { styles, colors } from "../styles/styles";
import Ionicons from '@expo/vector-icons/Ionicons'
import { ToDoEntry, Status } from '../../shared/types/ToDoEntry';

type PeriodicItemProp = {
  item: ToDoEntry,
  onPress: Function,
  onSwipe: Function,
}

export const PeriodicItem = ({ item, onPress, onSwipe }: PeriodicItemProp) => {
  const [prog, setProg] = useState<number>(0);

  useEffect(() => {
    setProg(() => 
      (new Date().getSeconds() - item.lastChecked!.getSeconds()) / item.period! * 100 <= 100 
      ? (new Date().getSeconds() - item.lastChecked!.getSeconds()) / item.period! * 100 : 100 );
  }, []);

  const renderActions = (text: string) => (
    <View style={styles.deleteContainer}>
      <Text style={styles.deleteText}>{text}</Text>
    </View>
  );

  return (
    <Swipeable 
    renderRightActions={() => renderActions("DELETE")}
    dragOffsetFromRightEdge={Number.MAX_VALUE}
    onSwipeableOpen={() => onSwipe(item.id)} 
    containerStyle={{ width: '100%' }} 
    testID="TodoItem">
      <View style={styles.item}>
        <View 
        testID="ProgBar" 
        style={{position: 'relative', width: 500, backgroundColor: colors.soxred }} />
        <Text style={styles.itemText} numberOfLines={1}>{item.text}</Text>
      </View>
    </Swipeable>
  );
}