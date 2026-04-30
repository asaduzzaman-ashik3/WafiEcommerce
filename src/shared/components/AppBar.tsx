import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { LiquidGlass } from "./LiquidGlass";
import { Colors } from "@/src/core/constants/colors";
import { Sizes } from "@/src/core/constants/sizes";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useNavigation } from "expo-router";
import { DrawerActions } from "@react-navigation/native";

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

  const handleDrawerToggle = () => {
    navigation.dispatch(DrawerActions.toggleDrawer());
  };

  return (
    <View className="px-md pb-sm" style={{ paddingTop: insets.top }}>
      <LiquidGlass
        borderRadius={Sizes.radiusMd}
        className="h-app-bar"
        pressable={false}
      >
        <View className="flex-1 flex-row items-center px-md">
          {/* Left */}
          <View className="w-11 items-start justify-center">
            {showBack ? (
              <TouchableOpacity onPress={onBackPress}>
                <IconSymbol
                  name="chevron.left"
                  size={24}
                  color={Colors.textPrimary}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={handleDrawerToggle}>
                <IconSymbol
                  name="line.3.horizontal"
                  size={24}
                  color={Colors.primary}
                />
              </TouchableOpacity>
            )}
          </View>

          {/* Center */}
          <View className="flex-1 items-center justify-center">
            <Text className="text-[16px] font-bold text-primary">{title}</Text>
          </View>

          {/* Right */}
          <View className="w-11 items-end justify-center">
            {rightElement ?? (
              <TouchableOpacity
                onPress={onNotificationPress}
                activeOpacity={0.7}
                className="w-9 h-9 items-center justify-center"
              >
                <IconSymbol name="bell.fill" size={22} color={Colors.primary} />
                {notificationCount > 0 && (
                  <View className="absolute top-0 right-0 min-w-[14px] h-[14px] bg-red-500 rounded-full items-center justify-center px-[3px]">
                    <Text className="text-[9px] font-bold text-white">
                      {notificationCount > 99 ? "99+" : notificationCount}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            )}
          </View>
        </View>
      </LiquidGlass>
    </View>
  );
};
