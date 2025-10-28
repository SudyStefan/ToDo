import { ToDoEntry } from "../../shared/types/ToDoEntry";
import { Animated, Text, useWindowDimensions, View } from "react-native";
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import React, { useEffect, useRef, useState } from "react";
import SinglePage from "./SinglePage";
import { styles, colors } from "../styles/styles";
import FloatingPressable from "./FloatingPressable";
import { AddView } from "./AddView";
import DonePage from "./DonePage";
import UndoPopup from "./UndoPopup";

const routes = [
  { key: 'single', title: 'SINGLE' },
  { key: 'rec', title: 'RECURING' },
  { key: 'done', title: 'DONE' },
];

type RootProp = {
  data: ToDoEntry[], 
  API_URL?: string
};

export const wait = (ms: number) =>
  new Promise(resolve => setTimeout(resolve, ms));

export default function Root({data, API_URL}: RootProp) {
  const [todos, setTodos] = useState<ToDoEntry[]>(data);
  const [addViewVisible, setAddViewVisible] = useState(false);
  const [recentlyChecked, setRecentlyChecked] = useState<ToDoEntry[]>([]);
  const [recentlyDeleted, setRecentlyDeleted] = useState<ToDoEntry[]>([]);


  const undoOpacity = useRef(new Animated.Value(0)).current;

  const checkTodo = (id: number) => {
    setRecentlyChecked([...recentlyChecked, todos.find(todo => todo.id === id)!]);
    setTodos(todos.map(todo => todo.id === id ? { ...todo, done: !todo.done } : todo));

    wait(3000)
      .then(() => Animated.timing(undoOpacity, {
                    toValue: 0,
                    duration: 1000,
                    useNativeDriver: true,
                  }).start())
      .then(() => wait(1000))
      .then(() => setRecentlyChecked([])) 
  };

  const undoCheck = (id: number) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, done: !todo.done } : todo));
    setRecentlyChecked(recentlyChecked.filter(todo => todo.id !== id));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const addTodo = (text: string) => {
    setTodos([...todos, { id: todos.length+1, text, done: false , creationDate: new Date()}]);
    setAddViewVisible(false);
  };

  const SingleRoute = () => (
    <SinglePage data={todos} onCheck={checkTodo} onDelete={deleteTodo} />
  );

  const RecRoute = () => (
    <View/> //To be implemented
  );

  const DoneRoute = () => (
    <DonePage data={todos} onUncheck={checkTodo} onDelete={deleteTodo}></DonePage>
  );

  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  
  return (
    <View style={styles.root} testID="Root">
      <AddView 
        isVisible={addViewVisible} 
        onAdd={addTodo} 
        onClose={() => setAddViewVisible(false)}/>
      <TabView
        testID="TabView"
        navigationState={{ index, routes }}
        renderScene={SceneMap({
          single: SingleRoute,
          rec: RecRoute,
          done: DoneRoute,
        })}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        tabBarPosition="bottom"
        commonOptions={{ labelStyle: {fontSize: layout.height * 0.02} }} //HUH?? https://stackoverflow.com/a/79518059
        renderTabBar={props => (
          <TabBar
            {...props}
            style={styles.tabBar}
            indicatorStyle={{top: 0, height: '100%', backgroundColor: colors.primaryDark}}
            activeColor={colors.secondaryLight}
          />
        )}
      />
      <View style={{position: 'absolute', bottom: layout.height * 0.11, right: layout.width * 0.07}} testID="ButtonView">
        <FloatingPressable 
          onPress={() => setAddViewVisible(true)} 
          style={styles.roundPressableButton}
          iconName={"add"} />
      </View>
      <UndoPopup 
      data={recentlyChecked} 
      defaultText="CHECKED" 
      onUndo={undoCheck}
      fadeOpacity={undoOpacity} />
    </View>
  );
}