import { AppBar } from "@/components/shared/AppBar";
import React from "react";
import { Text, View } from "react-native";

export const ProductListScreen = () => {
  return (
    <View className="flex-1">
      <AppBar title="Products" showBack />
      <View className="flex-1 items-center justify-center">
        <Text className="text-lg font-bold">Product List Screen</Text>
      </View>
    </View>
  );
};
