import { Todo, TodoStatus, TodoType } from "../types/todo";
import { Platform, useWindowDimensions, View } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import React, { useState } from "react";
import { SinglePage } from "./SinglePage";
import { styles, colors } from "../styles/styles";
import { FloatingPressable } from "./FloatingPressable";
import { AddView } from "./AddView";
import { DonePage } from "./DonePage";
import { InfoPopup, PopupItem } from "./InfoPopup";
import { todoService } from "../services/todoService";
import { SafeAreaView } from "react-native-safe-area-context";
import { geminiService } from "../services/geminiService";
import { v4 as uuid } from "uuid";
import { OfflineStorage } from "../offline_storage/OfflineStorage";

const routes = [
  { key: "single", title: "SINGLE" },
  { key: "done", title: "DONE" },
];

export type RootProp = {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  online: boolean;
  offlineStorage: OfflineStorage;
};

export const Root = ({ todos, setTodos, online, offlineStorage }: RootProp) => {
  const [addViewVisible, setAddViewVisible] = useState(false);
  const [popupItems, setPopupItems] = useState<PopupItem[]>([]);
  const [index, setIndex] = React.useState(0);
  const layout = useWindowDimensions();

  const changeTodo = (id: string, newStatus: TodoStatus) => {
    const todo = todos.find((item) => item.id === id)!;
    setPopupItems([
      ...popupItems,
      {
        id: todo.id,
        text: todo.text,
        prevStatus: todo.status,
        currentStatus: newStatus,
      },
    ]);
    setTodos(
      todos.map((item) =>
        item.id === id ? { ...item, status: newStatus } : item
      )
    );
    offlineStorage.upsertTodo({
      ...todo,
      status: newStatus,
    });
  };

  const undoChange = (id: string) => {
    const revertedTodo: Todo = {
      ...todos.find((item) => item.id === id)!,
      status: popupItems.find((item) => item.id === id)!.prevStatus!,
    };
    setTodos((items) =>
      items.map((todo) => (todo.id === id ? revertedTodo : todo))
    );
    setPopupItems((changed) => changed.filter((todo) => todo.id !== id));
    offlineStorage.upsertTodo(revertedTodo);
  };

  const syncOnTimeout = (id: string) => {
    online &&
      todoService
        .putTodo(todos.find((item) => item.id === id)!)
        .then(() =>
          setPopupItems((prev) => prev.filter((item) => item.id !== id))
        )
        .catch((err) => console.error(`Failed to sync: ${err}`));
  };

  const addTodo = (text: string, type: TodoType, period = undefined) => {
    const todo: Todo = {
      id: uuid(),
      text: text,
      status: TodoStatus.OPEN,
      creationDate: new Date(),
      type: type,
      periodSeconds: period,
    };

    if (online) {
      todoService
        .postTodo(todo)
        .then((newTodo) => {
          setTodos([...todos, newTodo]);
          offlineStorage.upsertTodo(newTodo);
        })
        .catch((err) => {
          console.error("Failed to add todo:", err);
          //Implement adding error to popup
        });
    } else {
      offlineStorage.upsertTodo(todo);
    }

    setAddViewVisible(false);
  };

  const SingleRoute = () => (
    <SinglePage
      data={todos.filter(
        (item) =>
          item.type === TodoType.SINGLE && item.status === TodoStatus.OPEN
      )}
      onCheck={(id: string) => changeTodo(id, TodoStatus.DONE)}
    />
  );

  const DoneRoute = () => (
    <DonePage
      data={todos.filter(
        (item) =>
          item.type === TodoType.SINGLE && item.status === TodoStatus.DONE
      )}
      onUncheck={(id: string) => changeTodo(id, TodoStatus.OPEN)}
      onDelete={(id: string) => changeTodo(id, TodoStatus.DELETED)}
    />
  );

  const geminiTest = (text: string): void => {
    geminiService
      .fetchGeminiResponse(text)
      .then((res) => {
        addTodo(res, TodoType.SINGLE);
      })
      .catch((err) => console.error(err));
  };

  const SafeView = Platform.OS === "web" ? View : SafeAreaView;
  return (
    <SafeView style={styles.root} testID="Root">
      <AddView
        isVisible={addViewVisible}
        onAdd={(text: string, type: TodoType) => addTodo(text, type)}
        onClose={() => setAddViewVisible(false)}
      />
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
        commonOptions={{ labelStyle: { fontSize: layout.height * 0.02 } }} //??? https://stackoverflow.com/a/79518059
        renderTabBar={(props) => (
          <TabBar
            {...props}
            style={styles.tabBar}
            indicatorStyle={{
              top: 0,
              height: "100%",
              backgroundColor: colors.primaryDark,
            }}
            activeColor={colors.secondaryLight}
          />
        )}
      />
      <View style={styles.floatingPressableView}>
        <FloatingPressable
          onPress={() => setAddViewVisible(true)}
          style={styles.roundPressableButton}
          iconName={"add"}
        />
        <FloatingPressable
          onPress={() => geminiTest("I ran out of toilet paper")}
          style={styles.roundPressableButton}
          iconName={"mic"}
        />
      </View>
      <InfoPopup
        data={popupItems}
        onUndo={(id: string) => undoChange(id)}
        onTimeout={(id: string) => syncOnTimeout(id)}
      />
    </SafeView>
  );
};
