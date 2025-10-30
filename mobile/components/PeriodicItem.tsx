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
  const prog = Math.min((Date.now()/1000 - item.lastChecked!.getTime()/1000) / item.period!, 1);
  const minutesUntilDue =  (item.lastChecked!.getTime()/1000 + item.period! - Date.now()/1000) / 60;

  const renderActions = (text: string) => (
    <View style={styles.deleteContainer}>
      <Text style={styles.deleteText}>{text}</Text>
    </View>
  );

  return (
    <Swipeable 
    // renderRightActions={() => renderActions("DELETE")}
    // dragOffsetFromRightEdge={Number.MAX_VALUE}
    // onSwipeableOpen={() => onSwipe(item.id)} 
    containerStyle={{ width: '100%' }} 
    testID="TodoItem">
      <View style={{...styles.item, paddingHorizontal: 0}}>
        <View 
        testID="ProgBar" 
        style={{ position: 'absolute', height: "100%", width: `${prog * 100}%`, backgroundColor: prog < 1 ? colors.seattlegreen : colors.soxred }} />
        <Text style={{...styles.itemText, paddingHorizontal: 20}} numberOfLines={1}>{item.text}</Text>
        <Text style={{...styles.itemText, paddingHorizontal: 20}}>
          {prog < 1 ? `DUE IN ${Math.floor(minutesUntilDue / 60 / 24)}d ${Math.floor(minutesUntilDue / 60 % 24)}h ${Math.floor(minutesUntilDue % 60)}m` : 
          `OVERDUE FOR ${Math.abs(Math.floor(minutesUntilDue / 60 / 24))}d ${Math.abs(Math.floor(minutesUntilDue / 60 % 24))}h ${Math.abs(Math.floor(minutesUntilDue % 60))}m` }
        </Text>
      </View>
    </Swipeable>
  );
}