import { useEffect, useState } from "react";
import { View, Text, TextInput, Button, FlatList, Pressable, StyleSheet, Dimensions } from "react-native";
import { ToDoEntry, Status, Type } from "../../shared/types/ToDoEntry";
import { styles } from "../styles/styles";
import { TodoItem } from "./TodoItem";
import { PeriodicItem } from "./PeriodicItem";

type PeriodicPageProp = {
  data: ToDoEntry[];
  onCheck: Function;
  onDelete: Function;
};

export default function PeriodicPage({data, onCheck, onDelete}: PeriodicPageProp) {

  return (
    <FlatList
    data={data.filter(data => data.status !== Status.Deleted && data.type === Type.Periodic)}
    keyExtractor={item => item.id.toString()}
    contentContainerStyle={styles.periodicList}
    renderItem={({ item }) => 
      <PeriodicItem 
      item={item} 
      onSwipe={onCheck} 
      onPress={onCheck} />
    }/>
  );
}