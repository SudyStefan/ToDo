import { useEffect, useState } from "react";
import { View, Text, TextInput, Button, FlatList, Pressable, StyleSheet, Dimensions } from "react-native";
import { ToDoEntry, ToDoStatus, ToDoType } from "../../shared/types/ToDoEntry";
import { styles } from "../styles/styles";
import { ToDoItem } from "./ToDoItem";

export type SinglePageProp = {
  data: ToDoEntry[];
  onCheck: Function;
};

export const SinglePage = ({data, onCheck}: SinglePageProp) => {
  return (
    <FlatList testID="SinglePage"
    data={data.filter(data => data.type === ToDoType.Single && data.status === ToDoStatus.Open)}
    keyExtractor={item => item._id}
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