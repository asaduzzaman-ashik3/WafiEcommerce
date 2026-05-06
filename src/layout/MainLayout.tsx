import ToastConfig from "@/config/toast-config";
import { useTheme } from "@/context/ThemeContext";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Dimensions, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

interface MainLayoutProps {
  children: React.ReactNode;
}

const { width, height } = Dimensions.get("window");

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { colors } = useTheme();

  return (
    <View className="flex-1" style={{ backgroundColor: colors.background }}>
      {/* Background Gradient */}
      <LinearGradient
        colors={[colors.gradientTop, colors.gradientMid, colors.gradientBottom]}
        locations={[0, 0.5, 1]}
        start={{ x: 0.1, y: 0 }}
        end={{ x: 0.9, y: 1 }}
        className="absolute inset-0"
      />

      <SafeAreaView className="flex-1" edges={["right", "left"]}>
        {children}
      </SafeAreaView>
      <Toast config={ToastConfig} />
    </View>
  );
};
