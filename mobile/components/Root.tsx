import { ToDoEntry } from "../../shared/types/ToDoEntry";
import { Text, useWindowDimensions, View } from "react-native";
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import React, { useState } from "react";
import SinglePage from "./SinglePage";
import { styles } from "../styles/styles";
import FloatingPressable from "./FloatingPressable";
import { AddView } from "./AddView";

  const routes = [
    { key: 'single', title: 'SINGLE' },
    { key: 'rec', title: 'RECURING' },
    { key: 'done', title: 'DONE' },
  ];

export default function Root({data, API_URL}: {data: ToDoEntry[], API_URL?: string}) {
  const [todos, setTodos] = useState<ToDoEntry[]>(data);
  const [addViewVisible, setAddViewVisible] = useState(false);

  const checkTodo = (id: number) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, done: !todo.done } : todo));
  }

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  }

  const addTodo = (text: string) => {
    console.log(text);
    setTodos([...todos, { id: todos.length+1, text, done: false , creationDate: new Date()}]);
    setAddViewVisible(false);
  }

  const SingleRoute = () => (
    <SinglePage data={todos} onCheck={(id: number) => checkTodo(id)} onDelete={(id: number) => deleteTodo(id)} />
  );

  const RecRoute = () => (
    <View/> //To be implemented
  );

  const DoneRoute = () => (
    <View/> //To be implemented
  );

  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  
  return (
    <View>
      <AddView 
        isVisible={addViewVisible} 
        onAdd={addTodo} 
        onClose={() => setAddViewVisible(false)}/>
      <TabView
        navigationState={{ index, routes }}
        renderScene={SceneMap({
          single: SingleRoute,
          rec: RecRoute,
          done: DoneRoute,
        })}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={props => (
          <TabBar
            {...props}
            style={styles.tabBar}
            indicatorStyle={{top: 0, height: '100%', backgroundColor: '#333'}}
            activeColor="#fff"
          />
        )}
        tabBarPosition="bottom"
      />
      <View style={{...styles.fullScreenView, bottom: layout.height * 0.1, right: layout.width * 0.07}}>
        <FloatingPressable 
          onPress={() => setAddViewVisible(true)} 
          style={styles.roundPressableButton}
          iconName={"add"} />
      </View>
    </View>
  );
}