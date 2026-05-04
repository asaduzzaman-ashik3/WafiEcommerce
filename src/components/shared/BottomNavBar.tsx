import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/colors";
import { Sizes } from "@/constants/sizes";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import React, { useRef } from "react";
import { Animated, Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LiquidGlass } from "./LiquidGlass";

const TabItem = ({
  label,
  isFocused,
  onPress,
  route,
}: {
  label: string;
  isFocused: boolean;
  onPress: () => void;
  route: string;
}) => {
  const rippleScale = useRef(new Animated.Value(0)).current;
  const rippleOpacity = useRef(new Animated.Value(0)).current;
  const itemScale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    // Ripple animation
    rippleScale.setValue(0);
    rippleOpacity.setValue(0.4);
    Animated.parallel([
      Animated.timing(rippleScale, {
        toValue: 1,
        duration: 350,
        useNativeDriver: true,
      }),
      Animated.timing(rippleOpacity, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }),
      // Flicker/Scale animation
      Animated.spring(itemScale, {
        toValue: 0.9,
        useNativeDriver: true,
        speed: 50,
        bounciness: 8,
      }),
    ]).start();
  };

  const handlePressOut = () => {
    Animated.spring(itemScale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 20,
      bounciness: 12,
    }).start();
  };

  const getIcon = (name: string, color: string) => {
    let iconName: any = "house.fill";
    if (name === "index") iconName = "house.fill";
    if (name === "categories") iconName = "square.grid.2x2.fill";
    if (name === "orders") iconName = "bag.fill";
    if (name === "cart") iconName = "cart.fill";
    if (name === "profile") iconName = "person.fill";
    return <IconSymbol size={22} name={iconName} color={color} />;
  };

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      className="flex-col items-center justify-center flex-1"
    >
      <Animated.View
        className="w-[42px] h-[42px] items-center justify-center rounded-full mb-[2px] overflow-hidden"
        style={{ transform: [{ scale: itemScale }] }}
      >
        {/* Focused Background Layer */}
        {isFocused && (
          <View
            className="absolute inset-0 bg-red"
            style={{ backgroundColor: Colors.primary }}
          />
        )}

        <View className="w-full h-full items-center justify-center rounded-full">
          {getIcon(
            route,
            isFocused ? Colors.primaryPale : Colors.textSecondary,
          )}
        </View>
      </Animated.View>
      <Text
        className={`text-[10px] font-semibold ${isFocused ? "text-primary" : "text-text-secondary"}`}
      >
        {label}
      </Text>
    </Pressable>
  );
};

export const BottomNavBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      className="absolute bottom-0 left-0 right-0 px-md "
      style={{ paddingBottom: insets.bottom + Sizes.sm }}
    >
      <LiquidGlass borderRadius={20} className="h-[80px]" pressable={false}>
        <View className="flex-1 flex-row items-center justify-around px-sm">
          {state.routes.map((route, index) => {
            const { options } = descriptors[route.key];
            const label =
              options.title !== undefined ? options.title : route.name;
            const isFocused = state.index === index;

            const onPress = () => {
              const event = navigation.emit({
                type: "tabPress",
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            };

            return (
              <TabItem
                key={route.key}
                label={label}
                isFocused={isFocused}
                onPress={onPress}
                route={route.name}
              />
            );
          })}
        </View>
      </LiquidGlass>
    </View>
  );
};
