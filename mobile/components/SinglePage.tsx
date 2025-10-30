import { useEffect, useState } from "react";
import { View, Text, TextInput, Button, FlatList, Pressable, StyleSheet, Dimensions } from "react-native";
import { ToDoEntry, Status, Type } from "../../shared/types/ToDoEntry";
import { styles } from "../styles/styles";
import { ToDoItem } from "./ToDoItem";

type SinglePageProp = {
  data: ToDoEntry[];
  onCheck: Function;
};

export default function SinglePage({data, onCheck}: SinglePageProp) {
  return (
    <FlatList testID="SinglePage"
    data={data.filter(data => data.type === Type.Single && data.status === Status.Open)}
    keyExtractor={item => item.id.toString()}
    contentContainerStyle={styles.singleList}
    renderItem={({ item }) => 
      <ToDoItem 
      item={item} 
      onSwipe={onCheck} 
      onPress={onCheck} 
      swipeLeft={true} />
    }/>
  );
}