import { AppBar } from "@/components/shared/AppBar";
import { useTheme } from "@/context/ThemeContext";
import React from "react";
import { Text, View } from "react-native";

export const CategoriesScreen = () => {
  const { colors } = useTheme();

  return (
    <View className="flex-1">
      <AppBar title="Categories" />
      <View className="flex-1 items-center justify-center">
        <Text 
          className="text-lg font-bold"
          style={{ color: colors.textPrimary }}
        >
          Categories Screen
        </Text>
      </View>
    </View>
  );
};
