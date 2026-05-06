import { AppBar } from "@/components/shared/AppBar";
import React from "react";
import { Text, View } from "react-native";

export const CartScreen = () => {
  return (
    <View className="flex-1">
      <AppBar title="Wafi Ecommerce" />
      <View className="flex-1 items-center justify-center">
        <Text className="text-lg font-bold">Cart Screen</Text>
      </View>
    </View>
  );
};
