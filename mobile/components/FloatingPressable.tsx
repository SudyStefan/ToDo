import React from "react";
import { Dimensions, Pressable, StyleProp, ViewStyle } from "react-native";
import { colors } from "../styles/styles";
import Ionicons from '@expo/vector-icons/Ionicons'

export type FloatingPressableProp = {
  onPress: Function,
  style: StyleProp<ViewStyle>,
  iconName: any,
};

export const FloatingPressable = ({onPress, style, iconName}: FloatingPressableProp) => {
  return (
    <Pressable onPress={() => onPress()} style={style}>
      <Ionicons 
      name={iconName} 
      size={Dimensions.get('window').height * 0.05} 
      color={colors.primaryLight} />
    </Pressable>
  );
}