import { View, Text } from "react-native";

export type ErrorItemProp = {
  error: string;
};

export const ErrorItem = ({ error }: ErrorItemProp) => {
  return (
    <View>
      <Text>{error}</Text>
    </View>
  );
};
