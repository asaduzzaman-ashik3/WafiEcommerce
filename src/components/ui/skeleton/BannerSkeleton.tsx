import { Sizes, window } from "@/constants/sizes";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

const { width } = window;
const SKELETON_WIDTH = width - 32;

export const BannerSkeleton = () => {
  const translateX = useSharedValue(-SKELETON_WIDTH);

  useEffect(() => {
    translateX.value = withRepeat(
      withTiming(SKELETON_WIDTH, { duration: 1500 }),
      -1,
      false
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <View className="items-center w-full px-4 mt-2">
      <View
        style={{
          width: SKELETON_WIDTH,
          height: 200,
          backgroundColor: "#E8E8E8",
          borderRadius: Sizes.radiusMd,
          overflow: "hidden",
        }}
      >
        <Animated.View style={[StyleSheet.absoluteFill, animatedStyle]}>
          <LinearGradient
            colors={["transparent", "rgba(255, 255, 255, 0.6)", "transparent"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={StyleSheet.absoluteFill}
          />
        </Animated.View>
      </View>
    </View>
  );
};
