import { AppBar } from "@/components/shared/AppBar";
import React from "react";
import { Text, View } from "react-native";

export const AddressScreen = () => {
  return (
    <View className="flex-1">
      <AppBar title="Shipping Address" showBack />
      <View className="flex-1 items-center justify-center">
        <Text className="text-lg font-bold">Address Screen</Text>
      </View>
    </View>
  );
};
