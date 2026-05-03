import { Colors } from "@/constants/colors";
import React from "react";
import { ActivityIndicator, Modal, View } from "react-native";
import { LiquidGlass } from "./shared/LiquidGlass";

interface LoadingIndicatorProps {
  visible: boolean;
}

export const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({
  visible,
}) => {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View className="flex-1 bg-black/10 items-center justify-center">
        <LiquidGlass
          borderRadius={20}
          className="w-[100px] h-[100px]"
          pressable={false}
        >
          <View className="flex-1 items-center justify-center">
            <ActivityIndicator size="large" color={Colors.primary} />
          </View>
        </LiquidGlass>
      </View>
    </Modal>
  );
};
