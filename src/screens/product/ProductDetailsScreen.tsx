import { AppBar } from "@/components/shared/AppBar";
import React from "react";
import { Text, View } from "react-native";

export const ProductDetailsScreen = () => {
  return (
    <View className="flex-1">
      <AppBar title="Product Details" showBack />
      <View className="flex-1 items-center justify-center">
        <Text className="text-lg font-bold">Product Details Screen</Text>
      </View>
    </View>
  );
};
