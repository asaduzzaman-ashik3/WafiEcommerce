import { IconSymbol } from "@/components/ui/icon-symbol";
import { Sizes } from "@/constants/sizes";
import { useTheme } from "@/context/ThemeContext";
import { DrawerActions } from "@react-navigation/native";
import { router, useNavigation } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LiquidGlass } from "./LiquidGlass";

const APP_ICON = require("../../assets/images/app_icon.png");

interface AppBarProps {
  title: string;
  showBack?: boolean;
  onBackPress?: () => void;
  onNotificationPress?: () => void;
  notificationCount?: number;
  rightElement?: React.ReactNode;
}

export const AppBar: React.FC<AppBarProps> = ({
  title,
  showBack,
  onBackPress,
  onNotificationPress,
  notificationCount = 0,
  rightElement,
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

        {/* Center Section - Title Container */}
        <LiquidGlass
          borderRadius={Sizes.radiusMd}
          style={{ height: 44, paddingHorizontal: 20 }}
          pressable={false}
        >
          <View className="flex-1 items-center justify-center">
            <Text
              className="text-base font-medium tracking-tight"
              style={{ color: colors.primary }}
            >
              {title}
            </Text>
          </View>
        </LiquidGlass>

        {/* Right Section - Notifications/Actions */}
        <LiquidGlass
          borderRadius={Sizes.radiusFull}
          style={{ height: 44, paddingHorizontal: 12 }}
          pressable={false}
        >
          <View className="flex-row items-center gap-4">
            {/* Cart Icon */}
            <TouchableOpacity onPress={() => router.push("/orders")}>
              <IconSymbol name="cart.fill" size={20} color={colors.primary} />
            </TouchableOpacity>

            {/* Notification Icon */}
            <TouchableOpacity
              onPress={onNotificationPress}
              activeOpacity={0.7}
              className="relative"
            >
              <IconSymbol name="bell.fill" size={20} color={colors.primary} />
              {notificationCount > 0 ? (
                <View className="absolute -top-1 -right-1 min-w-[14px] h-[14px] bg-red-500 rounded-full items-center justify-center px-[3px] border-[1.5px] border-white/20">
                  <Text className="text-[8px] font-bold text-white">
                    {notificationCount > 99 ? "99+" : notificationCount}
                  </Text>
                </View>
              ) : null}
            </TouchableOpacity>
          </View>
        </LiquidGlass>
      </View>
    </View>
  );
};
