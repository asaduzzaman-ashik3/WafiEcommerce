import { AppBar } from "@/components/shared/AppBar";
import React from "react";
import { Text, View } from "react-native";

export const RegisterScreen = () => {
  return (
    <View className="flex-1">
      <AppBar title="Register" />
      <View className="flex-1 items-center justify-center">
        <Text className="text-lg font-bold">Register Screen</Text>
      </View>
    </View>
  );
};
