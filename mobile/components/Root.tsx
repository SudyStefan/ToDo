import { TodoItem, TodoStatus, TodoType } from "../models/todoItem";
import { useWindowDimensions, View } from "react-native";
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import React, { useState } from "react";
import { SinglePage } from "./SinglePage";
import { styles, colors } from "../styles/styles";
import { FloatingPressable } from "./FloatingPressable";
import { AddView } from "./AddView";
import { DonePage } from "./DonePage";
import { InfoPopup, PopupItem } from "./InfoPopup";
import { PeriodicPage } from "./PeriodicPage";
import { TodoService } from "../service/todoService";

const routes = [
  { key: 'single', title: 'SINGLE' },
  { key: 'periodic', title: 'PERIODIC' },
  { key: 'done', title: 'DONE' },
];

export type RootProp = {
  todos: TodoItem[],
  setTodos: React.Dispatch<React.SetStateAction<TodoItem[]>>
}

export const Root = ({todos, setTodos}: RootProp) => {
  const [addViewVisible, setAddViewVisible] = useState(false);
  const [popupItems, setPopupItems] = useState<PopupItem[]>([]);

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
    TodoService.putTodo(todos.find(item => item.id === id)!)
          .then(() => setPopupItems(prev => prev.filter(item => item.id !== id)))
          .catch(err => console.error(`Failed to sync: ${err}`));
    };

  const addTodo = async (text: string, type: TodoType, period = undefined) => {
    const todo: TodoItem = {
        id: null as any, 
        text: text, 
        status: TodoStatus.OPEN, 
        creationDate: new Date(), 
        type: type,
        periodSeconds: period,
    }

    TodoService.postTodo(todo)
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

  const PeriodicRoute = () => (
    <PeriodicPage 
    data={todos.filter(item => item.type === TodoType.PERIODIC)}
    onCheck={(id: string) => changeTodo(id, TodoStatus.DONE)}
    onDelete={(id: string) => changeTodo(id, TodoStatus.DELETED)} />
  );

  const DoneRoute = () => (
    <DonePage 
    data={todos.filter(item => item.type === TodoType.SINGLE && item.status === TodoStatus.DONE)} 
    onUncheck={(id: string) => changeTodo(id, TodoStatus.OPEN)} 
    onDelete={(id: string) => changeTodo(id, TodoStatus.DELETED)} />
  );

  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  
  return (
    <View style={styles.root} testID="Root">
      <AddView 
        isVisible={addViewVisible} 
        onAdd={(text: string, type: TodoType) => addTodo(text, type)} 
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
      <InfoPopup 
      data={popupItems} 
      onUndo={(id: string) => undoChange(id)}
      onTimeout={(id: string) => syncOnTimeout(id)} />
    </View>
  );
}