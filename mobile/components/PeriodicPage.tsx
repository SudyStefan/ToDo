import { useEffect, useState } from "react";
import { View, Text, TextInput, Button, FlatList, Pressable, StyleSheet, Dimensions } from "react-native";
import { ToDoEntry, ToDoStatus, ToDoType } from "../../shared/types/ToDoEntry";
import { styles } from "../styles/styles";
import { ToDoItem } from "./ToDoItem";
import { PeriodicItem } from "./PeriodicItem";

export type PeriodicPageProp = {
  data: ToDoEntry[];
  onCheck: Function;
  onDelete: Function;
};

export const PeriodicPage = ({data, onCheck, onDelete}: PeriodicPageProp) => {
  return (
    <FlatList
    data={data.filter(data => data.status !== ToDoStatus.Deleted && data.type === ToDoType.Periodic)}
    keyExtractor={item => item._id}
    contentContainerStyle={styles.periodicList}
    renderItem={({ item }) => 
      <PeriodicItem 
      item={item} 
      onSwipe={onCheck} 
      onPress={onCheck} />
    }/>
  );
}