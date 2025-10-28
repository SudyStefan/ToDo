import React from "react";
import { Dimensions, Pressable, StyleProp, View, ViewStyle } from "react-native";
import { colors } from "../styles/styles";
import Ionicons from '@expo/vector-icons/Ionicons'

type FPProps = {
  onPress: Function,
  style: StyleProp<ViewStyle>,
  iconName: any,
};

export default function FloatingPressable({onPress, style, iconName}: FPProps) {
  return (
    <Pressable onPress={() => onPress()} style={style}>
      <Ionicons 
      name={iconName} 
      size={Dimensions.get('window').height * 0.05} 
      color={colors.primaryLight} />
    </Pressable>
  );
}