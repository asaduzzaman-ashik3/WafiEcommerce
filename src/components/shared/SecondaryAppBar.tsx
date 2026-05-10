import { IconSymbol } from "@/components/ui/icon-symbol";
import { Sizes } from "@/constants/sizes";
import { useTheme } from "@/context/ThemeContext";
import { DrawerActions } from "@react-navigation/native";
import { router, useNavigation } from "expo-router";
import React from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LiquidGlass } from "./LiquidGlass";

const APP_ICON = require("../../assets/images/app_icon.png");

interface SecondaryAppBarProps {
  showBack?: boolean;
  onBackPress?: () => void;
}

export const SecondaryAppBar: React.FC<SecondaryAppBarProps> = ({
  showBack,
  onBackPress,
}) => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const { colors } = useTheme();

  const handleDrawerToggle = () => {
    navigation.dispatch(DrawerActions.toggleDrawer());
  };

  return (
    <View
      className="absolute top-0 left-0 right-0 z-50 px-md"
      style={{ paddingTop: insets.top }}
    >
      <View className="h-[64px] flex-row items-center justify-between">
        {/* Left Section - Drawer/Back Toggle */}
        <LiquidGlass
          borderRadius={Sizes.radiusFull}
          style={{ width: 44, height: 44 }}
          pressable
          onPress={showBack ? onBackPress : handleDrawerToggle}
        >
          <View className="flex-1 items-center justify-center">
            {showBack ? (
              <IconSymbol
                name="chevron.left"
                size={22}
                color={colors.textPrimary}
              />
            ) : (
              <Image
                source={APP_ICON}
                style={{ width: 34, height: 34, resizeMode: "contain" }}
              />
            )}
          </View>
        </LiquidGlass>

        {/* Center Section - Nothing (Empty) */}
        <View style={{ flex: 1 }} />

        {/* Right Section - Cart Icon Only */}
        <LiquidGlass
          borderRadius={Sizes.radiusFull}
          style={{ width: 44, height: 44 }}
          pressable={false}
        >
          <View className="flex-1 items-center justify-center">
            <TouchableOpacity onPress={() => router.push("/orders")}>
              <IconSymbol name="cart.fill" size={20} color={colors.primary} />
            </TouchableOpacity>
          </View>
        </LiquidGlass>
      </View>
    </View>
  );
};
