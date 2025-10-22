import { ToDoEntry } from "../../shared/types/ToDoEntry";
import { Text, useWindowDimensions, View } from "react-native";
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import React from "react";
import SinglePage from "./SinglePage";
import { styles } from "../styles/styles";

  const routes = [
    { key: 'single', title: 'SINGLE' },
    { key: 'rec', title: 'RECURING' },
    { key: 'done', title: 'DONE' },
  ];

export default function ToDo({data, API_URL}: {data: ToDoEntry[], API_URL?: string}) {
  
  const SingleRoute = () => (
    <SinglePage data={data} API_URL={API_URL} />
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
  );
}