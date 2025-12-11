import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import Swipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import { styles, colors } from "../styles/styles";
import { Todo } from "../types/todo";

export type PeriodicItemProp = {
  item: Todo;
  onPress: (id: string) => void;
  onSwipe: (id: string) => void;
};

export const PeriodicItem = ({ item, onSwipe }: PeriodicItemProp) => {
  const [prog, setProg] = useState(0);
  const [minutesUntilDue, setMinutesUntilDue] = useState(0);

  useEffect(() => {
    try {
      setProg(
        Math.min(
          (Date.now() / 1000 - item.lastChecked!.getTime() / 1000) /
            item.periodSeconds!,
          1
        )
      );
      setMinutesUntilDue(
        (item.lastChecked!.getTime() / 1000 +
          item.periodSeconds! -
          Date.now() / 1000) /
          60
      );
    } catch (err) {
      console.error(`${err} - lastChecked type: ${typeof item.lastChecked}`);
    }
  }, []);

  const renderActions = (text: string) => (
    <View style={styles.swipeContainer}>
      <Text style={styles.swipeText}>{text}</Text>
    </View>
  );

  return (
    <Swipeable
      renderRightActions={() => renderActions("DELETE")}
      dragOffsetFromRightEdge={Number.MAX_VALUE}
      onSwipeableOpen={() => onSwipe(item.id)}
      containerStyle={{ flexGrow: 1 }}
      childrenContainerStyle={{
        ...styles.item,
        borderBottomWidth: 0,
        paddingHorizontal: 0,
        paddingVertical: 0,
        minHeight: "10%"
      }}
      testID="TodoItem"
    >
      <View
        testID="ProgBar"
        style={{
          position: "absolute",
          height: "100%",
          width: `${prog * 100}%`,
          backgroundColor:
            prog < 1
              ? prog < 0.5
                ? colors.seattlegreen
                : colors.giantsorange
              : colors.soxred
        }}
      />
      <Text
        style={{ ...styles.itemText, paddingHorizontal: 20 }}
        numberOfLines={1}
      >
        {item.text}
      </Text>
      <Text style={{ ...styles.itemText, paddingHorizontal: 20 }}>
        {prog < 1
          ? `DUE IN ${Math.floor(minutesUntilDue / 60 / 24)}d ${Math.floor((minutesUntilDue / 60) % 24)}h ${Math.floor(minutesUntilDue % 60)}m`
          : `OVERDUE FOR ${Math.abs(Math.floor(minutesUntilDue / 60 / 24))}d ${Math.abs(Math.floor((minutesUntilDue / 60) % 24))}h ${Math.abs(Math.floor(minutesUntilDue % 60))}m`}
      </Text>
    </Swipeable>
  );
};
