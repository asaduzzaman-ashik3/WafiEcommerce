// src/shared/components/LiquidGlass.tsx
import { BlurView } from "expo-blur";
import React, { useRef } from "react";
import {
  Animated,
  Pressable,
  PressableProps,
  View,
  ViewStyle,
} from "react-native";
import { useTheme } from "@/context/ThemeContext";

export interface LiquidGlassProps extends PressableProps {
  children: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
  className?: string;
  borderRadius?: number;
  blurIntensity?: number;
  pressable?: boolean;
}

export const LiquidGlass: React.FC<LiquidGlassProps> = ({
  children,
  style,
  className,
  borderRadius = 24,
  blurIntensity = 30, // Reduced from 40 for a lighter glass effect
  pressable = true,
  onPress,
  ...rest
}) => {
  const scale = useRef(new Animated.Value(1)).current;
  const rippleScale = useRef(new Animated.Value(0)).current;
  const rippleOpacity = useRef(new Animated.Value(0)).current;
  const { colors } = useTheme();

  const onPressIn = (event: any) => {
    Animated.spring(scale, {
      toValue: 0.98,
      useNativeDriver: true,
      speed: 50,
      bounciness: 4,
    }).start();

    rippleScale.setValue(0);
    rippleOpacity.setValue(0.2);
    Animated.parallel([
      Animated.timing(rippleScale, {
        toValue: 2,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(rippleOpacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const onPressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 20,
      bounciness: 12,
    }).start();
  };

  const inner = (
    <Animated.View
      className={`overflow-hidden bg-transparent ${className || ""}`}
      style={[
        {
          borderRadius,
          transform: [{ scale }],
          shadowColor: colors.glassShadow,
          shadowOffset: { width: 0, height: 6 },
          shadowOpacity: 1,
          shadowRadius: 16,
          elevation: 8,
        },
        style,
      ]}
    >
      {/* Layer 1 — Tint & Background */}
      <View
        className="absolute inset-0"
        style={{
          borderRadius,
          backgroundColor: colors.glassBg,
          opacity: 1,
          zIndex: -2,
        }}
      />

      {/* Layer 2 — Blur pass */}
      <BlurView
        intensity={blurIntensity}
        tint={colors.isDark ? "dark" : "light"}
        className="absolute inset-0"
        style={{ borderRadius, zIndex: -1 }}
      />

      {/* Layer 3 — Shine border */}
      <View
        className="absolute inset-0 border-[0.5px]"
        style={{
          borderRadius,
          borderColor: colors.glassBorder,
          borderTopColor: colors.isDark
            ? "rgba(255,255,255,0.4)"
            : "rgba(255,255,255,0.6)",
          borderLeftColor: colors.isDark
            ? "rgba(255,255,255,0.3)"
            : "rgba(255,255,255,0.4)",
        }}
      />

      {/* Ripple Layer */}
      <Animated.View
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: 200,
          height: 200,
          marginLeft: -100,
          marginTop: -100,
          borderRadius: 100,
          backgroundColor: "white",
          opacity: rippleOpacity,
          transform: [{ scale: rippleScale }],
          zIndex: 1,
        }}
      />

      {/* Layer 4 — Content */}
      <View className="flex-1 relative z-[3] justify-center ">{children}</View>
    </Animated.View>
  );

  if (!pressable || !onPress) return inner;

  return (
    <Pressable
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      {...rest}
    >
      {inner}
    </Pressable>
  );
};
