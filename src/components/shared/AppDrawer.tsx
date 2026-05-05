import { IconSymbol } from "@/components/ui/icon-symbol";
import { Sizes } from "@/constants/sizes";
import { useTheme } from "@/context/ThemeContext";
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import { router } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LiquidGlass } from "./LiquidGlass";

export const AppDrawer: React.FC<DrawerContentComponentProps> = (props) => {
  const insets = useSafeAreaInsets();
  const { colors, isDark } = useTheme();

  const menuItems = [
    { label: "Home", icon: "house.fill", route: "/" },
    {
      label: "Categories",
      icon: "square.grid.2x2.fill",
      route: "/categories",
    },
    { label: "My Orders", icon: "cart.fill", route: "/orders" },
    { label: "Profile", icon: "person.fill", route: "/profile" },
  ];

  return (
    <View className="flex-1" style={{ backgroundColor: colors.surface }}>
      <DrawerContentScrollView
        {...props}
        scrollEnabled={false}
        contentContainerStyle={{ paddingTop: 0 }}
      >
        <View
          style={{ paddingTop: insets.top + Sizes.md }}
          className="px-md pb-xl"
        >
          <LiquidGlass
            borderRadius={20}
            className="p-md mb-xl"
            pressable={false}
          >
            <View className="flex-row items-center">
              <View
                className="w-14 h-14 rounded-full items-center justify-center mr-md"
                style={{ backgroundColor: colors.primary + "20" }}
              >
                <IconSymbol
                  name="person.fill"
                  size={32}
                  color={colors.primary}
                />
              </View>
              <View>
                <Text
                  className="text-lg font-bold"
                  style={{ color: colors.textPrimary }}
                >
                  Wafi User
                </Text>
                <Text
                  className="text-xs"
                  style={{ color: colors.textSecondary }}
                >
                  premium member
                </Text>
              </View>
            </View>
          </LiquidGlass>

          <View className="gap-y-2">
            {menuItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                className="flex-row items-center p-md rounded-xl"
                onPress={() => {
                  props.navigation.closeDrawer();
                  router.push(item.route as any);
                }}
              >
                <View
                  className="w-10 h-10 rounded-full items-center justify-center mr-md"
                  style={{
                    backgroundColor: isDark
                      ? "rgba(255,255,255,0.05)"
                      : "rgba(0,0,0,0.05)",
                  }}
                >
                  <IconSymbol
                    name={item.icon as any}
                    size={20}
                    color={colors.primary}
                  />
                </View>
                <Text
                  className="text-base font-semibold"
                  style={{ color: colors.textPrimary }}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </DrawerContentScrollView>

      {/* Footer / Logout */}
      <View
        style={{ paddingBottom: insets.bottom + Sizes.lg }}
        className="px-lg"
      >
        <TouchableOpacity
          className="flex-row items-center p-md rounded-xl"
          style={{ backgroundColor: colors.error + "15" }}
        >
          <IconSymbol
            name="arrow.left.square.fill"
            size={20}
            color={colors.error}
          />
          <Text
            className="ml-md text-base font-bold"
            style={{ color: colors.error }}
          >
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
