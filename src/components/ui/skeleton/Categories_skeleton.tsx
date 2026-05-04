import { LiquidGlass } from "@/components/shared/LiquidGlass";
import { Colors } from "@/constants/colors";
import { Sizes } from "@/constants/sizes";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

const SKELETON_ITEM_WIDTH = 120;

export const CategoriesSkeleton = () => {
  const translateX = useSharedValue(-SKELETON_ITEM_WIDTH);
  const opacity = useSharedValue(0.6);

  useEffect(() => {
    translateX.value = withRepeat(
      withTiming(SKELETON_ITEM_WIDTH, { duration: 1500 }),
      -1,
      false
    );
    opacity.value = withRepeat(
      withTiming(1, { duration: 1000 }),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const pulseStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const SkeletonItem = () => (
    <LiquidGlass
      borderRadius={Sizes.radiusFull}
      style={{ height: 50, width: SKELETON_ITEM_WIDTH }}
      pressable={false}
    >
      <Animated.View
        style={[
          {
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 18,
            gap: 10,
            overflow: "hidden",
          },
          pulseStyle,
        ]}
      >
        {/* Shimmer Effect */}
        <Animated.View style={[StyleSheet.absoluteFill, animatedStyle]}>
          <LinearGradient
            colors={["transparent", "rgba(255, 255, 255, 0.4)", "transparent"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={StyleSheet.absoluteFill}
          />
        </Animated.View>

        {/* Circle Icon */}
        <View
          style={{
            width: 30,
            height: 30,
            borderRadius: 15,
            backgroundColor: "rgba(0, 0, 0, 0.05)",
            borderWidth: 1,
            borderColor: "rgba(255,255,255,0.6)",
          }}
        />

        {/* Text placeholder */}
        <View
          style={{
            height: 12,
            width: 50,
            borderRadius: 4,
            backgroundColor: "rgba(0, 0, 0, 0.05)",
          }}
        />
      </Animated.View>
    </LiquidGlass>
  );

  return (
    <View className="mt-sm">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: Sizes.md,
          alignItems: "center",
          gap: 10,
        }}
      >
        {[1, 2, 3, 4, 5].map((item) => (
          <SkeletonItem key={item} />
        ))}
      </ScrollView>
    </View>
  );
};
