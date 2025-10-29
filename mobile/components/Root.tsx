import { ToDoEntry, Status, Type } from "../../shared/types/ToDoEntry";
import { Animated, Text, useWindowDimensions, View } from "react-native";
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import React, { useEffect, useRef, useState } from "react";
import SinglePage from "./SinglePage";
import { styles, colors } from "../styles/styles";
import FloatingPressable from "./FloatingPressable";
import { AddView } from "./AddView";
import DonePage from "./DonePage";
import UndoPopup from "./UndoPopup";
import PeriodicPage from "./PeriodicPage";

const routes = [
  { key: 'single', title: 'SINGLE' },
  { key: 'periodic', title: 'PERIODIC' },
  { key: 'done', title: 'DONE' },
];

type RootProp = {
  data: ToDoEntry[], 
  API_URL?: string
};

export type RecentlyChanged = {
  id: number,
  text: string,
  prevStatus: Status,
  currentStatus: Status,
};

export const wait = (ms: number) =>
  new Promise(resolve => setTimeout(resolve, ms));

export default function Root({data, API_URL}: RootProp) {
  const [todos, setTodos] = useState<ToDoEntry[]>(data);
  const [addViewVisible, setAddViewVisible] = useState(false);
  const [recentlyChanged, setRecentlyChanged] = useState<RecentlyChanged[]>([]);

  const changeTodo = (id: number, newStatus: Status) => {
    let todo = todos.find(item => item.id === id)!;
    setRecentlyChanged([...recentlyChanged, 
      { 
        id: todo.id, 
        text: todo.text, 
        prevStatus: todo.status, 
        currentStatus: newStatus 
      }]);
    setTodos(todos.map(item => item.id === id ? { ...item, status: newStatus } : item));
  };

  const undoChange = (id: number) => {
    setTodos(items => items.map(todo => todo.id === id ? 
      { ...todo, status: recentlyChanged.find(item => item.id === id)!.prevStatus } 
      : todo ));
    setRecentlyChanged(changed => changed.filter(todo => todo.id !== id));
  };

  const addTodo = (text: string, type: Type, period = undefined) => {
    setTodos([...todos, 
      { 
        id: todos.length+1, 
        text: text, 
        status: Status.Open, 
        creationDate: new Date(), 
        type: type,
        period: period,
      }]);
    setAddViewVisible(false);
  };

  const SingleRoute = () => (
    <SinglePage 
    data={todos} 
    onCheck={(id: number) => changeTodo(id, Status.Done)} />
  );

  const PeriodicRoute = () => (
    <PeriodicPage 
    data={todos}
    onCheck={(id: number) => changeTodo(id, Status.Done)}
    onDelete={(id: number) => changeTodo(id, Status.Deleted)} />
  );

  const DoneRoute = () => (
    <DonePage 
    data={todos} 
    onUncheck={(id: number) => changeTodo(id, Status.Open)} 
    onDelete={(id: number) => changeTodo(id, Status.Deleted)} />
  );

  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  
  return (
    <View style={styles.root} testID="Root">
      <AddView 
        isVisible={addViewVisible} 
        onAdd={(text: string, type: Type) => addTodo(text, type)} 
        onClose={() => setAddViewVisible(false)}/>
      <TabView
        testID="TabView"
        navigationState={{ index, routes }}
        renderScene={SceneMap({
          single: SingleRoute,
          periodic: PeriodicRoute,
          done: DoneRoute,
        })}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        tabBarPosition="bottom"
        commonOptions={{ labelStyle: {fontSize: layout.height * 0.02} }} //??? https://stackoverflow.com/a/79518059
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
      data={recentlyChanged} 
      onUndo={(id: number) => undoChange(id)}
      onTimeout={(id: number) => setRecentlyChanged(prev => prev.filter(item => item.id !== id))} />
    </View>
  );
}