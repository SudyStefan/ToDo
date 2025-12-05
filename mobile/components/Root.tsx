import { Todo, TodoStatus, TodoType } from "../types/todo";
import { Platform, useWindowDimensions, View } from "react-native";
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import React, { useState } from "react";
import { SinglePage } from "./SinglePage";
import { styles, colors } from "../styles/styles";
import { FloatingPressable } from "./FloatingPressable";
import { AddView } from "./AddView";
import { DonePage } from "./DonePage";
import { InfoPopup, PopupItem } from "./InfoPopup";
import { todoService } from "../service/todoService";
import { SafeAreaView } from "react-native-safe-area-context";

const routes = [
  { key: 'single', title: 'SINGLE' },
  { key: 'done', title: 'DONE' },
];

export type RootProp = {
  todos: Todo[],
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
  offline: boolean
}

export const Root = ({todos, setTodos}: RootProp) => {
  const [addViewVisible, setAddViewVisible] = useState(false);
  const [popupItems, setPopupItems] = useState<PopupItem[]>([]);
  const [index, setIndex] = React.useState(0);
  const layout = useWindowDimensions();

  const changeTodo = (id: string, newStatus: TodoStatus) => {
    const todo = todos.find(item => item.id === id)!;
    setPopupItems([...popupItems, 
      { 
        id: todo.id, 
        text: todo.text, 
        prevStatus: todo.status, 
        currentStatus: newStatus 
      }]);
    setTodos(todos.map(item => item.id === id ? { ...item, status: newStatus } : item));
  };

  const undoChange = (id: string) => {
    setTodos(items => items.map(todo => todo.id === id ? 
      { ...todo, status: popupItems.find(item => item.id === id)!.prevStatus! } 
        : todo ));
    setPopupItems(changed => changed.filter(todo => todo.id !== id));
  };

  const syncOnTimeout = (id: string) => {
    todoService.putTodo(todos.find(item => item.id === id)!)
      .then(() => setPopupItems(prev => prev.filter(item => item.id !== id)))
      .catch(err => console.error(`Failed to sync: ${err}`));
    };

  const addTodo = async (text: string, type: TodoType, period = undefined) => {
    const todo: Todo = {
      id: null as any, 
      text: text, 
      status: TodoStatus.OPEN, 
      creationDate: new Date(), 
      type: type,
      periodSeconds: period,
    }

    todoService.postTodo(todo)
      .then(newTodo => setTodos([...todos, newTodo]))
      .catch(err => {
        console.error("Failed to add todo:", err);
        //Implement adding error to popup
      });
    
    setAddViewVisible(false);
  };

  const SingleRoute = () => (
    <SinglePage 
      data={todos.filter(item => item.type === TodoType.SINGLE && item.status === TodoStatus.OPEN)} 
      onCheck={(id: string) => changeTodo(id, TodoStatus.DONE)} />
  );

  const DoneRoute = () => (
    <DonePage 
      data={todos.filter(item => item.type === TodoType.SINGLE && item.status === TodoStatus.DONE)} 
      onUncheck={(id: string) => changeTodo(id, TodoStatus.OPEN)} 
      onDelete={(id: string) => changeTodo(id, TodoStatus.DELETED)} />
  );


  const SafeView = Platform.OS === 'web' ? View : SafeAreaView;
  return (
    <SafeView style={styles.root} testID="Root">
      <AddView 
        isVisible={addViewVisible} 
        onAdd={(text: string, type: TodoType) => addTodo(text, type)} 
        onClose={() => setAddViewVisible(false)}/>
      <TabView
        testID="TabView"
        navigationState={{ index, routes }}
        renderScene={SceneMap({
          single: SingleRoute,
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
          activeColor={colors.secondaryLight} />
        )} />
      <View style={styles.floatingPressableView}>
        <FloatingPressable 
          onPress={() => setAddViewVisible(true)} 
          style={styles.roundPressableButton}
          iconName={"add"} />
        <FloatingPressable 
          onPress={() => {}}
          style={styles.roundPressableButton}
          iconName={"mic"} />
      </View>
      <InfoPopup 
        data={popupItems} 
        onUndo={(id: string) => undoChange(id)}
        onTimeout={(id: string) => syncOnTimeout(id)} />
    </SafeView>
  );
}