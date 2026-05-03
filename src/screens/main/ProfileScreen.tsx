import { AppBar } from "@/components/shared/AppBar";
import React from "react";
import { Text, View } from "react-native";

export const ProfileScreen = () => {
  return (
    <View className="flex-1">
      <AppBar title="Profile" />
      <View className="flex-1 items-center justify-center">
        <Text className="text-lg font-bold">Profile Screen</Text>
      </View>
    </View>
  );
};
