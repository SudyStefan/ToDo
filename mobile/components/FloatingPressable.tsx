import React from "react";
import { Dimensions, Pressable, StyleProp, View, ViewStyle } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons'

export default function FloatingPressable({onPress, style, iconName}: any) {
  return (
    <Pressable onPress={onPress} style={style}>
      <Ionicons name={iconName} size={Dimensions.get('window').height * 0.05} color="#fff" />
    </Pressable>
  );
}