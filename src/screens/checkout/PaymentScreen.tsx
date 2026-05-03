import { AppBar } from "@/components/shared/AppBar";
import React from "react";
import { Text, View } from "react-native";

export const PaymentScreen = () => {
  return (
    <View className="flex-1">
      <AppBar title="Payment" showBack />
      <View className="flex-1 items-center justify-center">
        <Text className="text-lg font-bold">Payment Screen</Text>
      </View>
    </View>
  );
};
