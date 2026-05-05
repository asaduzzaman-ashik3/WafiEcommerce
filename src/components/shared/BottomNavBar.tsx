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
  const itemScale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(itemScale, {
      toValue: 0.9,
      useNativeDriver: true,
      speed: 50,
      bounciness: 8,
    }).start();
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
    return <IconSymbol size={20} name={iconName} color={color} />;
  };

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      className="flex-1 items-center justify-center rounded-full"
    >
      <Animated.View
        className="w-full items-center justify-center"
        style={{ transform: [{ scale: itemScale }] }}
      >
        {isFocused ? (
          <LiquidGlass
            borderRadius={100}
            className=" items-center justify-center"
            blurIntensity={20}
            pressable={false}
            style={{ height: 62, width: 75 }}
          >
            <View className="items-center justify-center">
              {getIcon(route, Colors.primary)}
              <Text
                className="text-primary font-bold text-[10px] mt-[2px]"
                numberOfLines={1}
              >
                {label}
              </Text>
            </View>
          </LiquidGlass>
        ) : (
          <View className="items-center justify-center">
            {getIcon(route, "black")}
            <Text className="text-black text-[10px] mt-1 opacity-80 font-medium">
              {label}
            </Text>
          </View>
        )}
      </Animated.View>
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
      <LiquidGlass
        borderRadius={100}
        className="h-[78px]"
        blurIntensity={15}
        pressable={false}
      >
        <View className="flex-1 flex-row items-center justify-around">
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
