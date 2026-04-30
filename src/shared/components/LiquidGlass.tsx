// src/shared/components/LiquidGlass.tsx
/**
 * LiquidGlass — the core primitive that translates the CSS liquid-glass
 * morphism design into React Native.
 *
 * Layers (bottom → top):
 *  1. BlurView  — backdrop blur (glass-distortion equivalent)
 *  2. Tint      — rgba(255,255,255,0.25) white wash
 *  3. Shine     — inset border highlight on top & left edges
 *  4. {children}
 */

import { Colors } from '@/src/core/constants/colors';
import { BlurView } from 'expo-blur';
import React, { useRef } from 'react';
import {
  Animated,
  Pressable,
  PressableProps,
  View,
  ViewStyle,
} from 'react-native';

export interface LiquidGlassProps extends PressableProps {
  children: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
  className?: string;
  borderRadius?: number;
  blurIntensity?: number;
  /** If false, touch ripple animation is disabled */
  pressable?: boolean;
}

export const LiquidGlass: React.FC<LiquidGlassProps> = ({
  children,
  style,
  className,
  borderRadius = 24,
  blurIntensity = 22,
  pressable = true,
  onPress,
  ...rest
}) => {
  const scale = useRef(new Animated.Value(1)).current;

  const onPressIn = () => {
    Animated.spring(scale, {
      toValue: 0.97,
      useNativeDriver: true,
      speed: 50,
      bounciness: 8,
    }).start();
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
      className={`overflow-hidden bg-transparent ${className || ''}`}
      style={[
        { 
          borderRadius,
          transform: [{ scale }],
          shadowColor: Colors.glassShadow,
          shadowOffset: { width: 0, height: 6 },
          shadowOpacity: 1,
          shadowRadius: 16,
          elevation: 8,
        }, 
        style
      ]}
    >
      {/* Layer 1 — Blur */}
      <BlurView
        intensity={blurIntensity}
        tint="light"
        className="absolute inset-0"
        style={{ borderRadius }}
      />

      {/* Layer 2 — Tint */}
      <View
        className="absolute inset-0 bg-white/20"
        style={{ borderRadius }}
      />

      {/* Layer 3 — Shine border */}
      <View
        className="absolute inset-0 border-[1.5px] border-t-white/80 border-l-white/60 border-r-white/20 border-b-white/20 bg-transparent"
        style={{ borderRadius }}
      />

      {/* Layer 4 — Content */}
      <View className="flex-1 relative z-[3]">{children}</View>
    </Animated.View>
  );

  if (!pressable || !onPress) return inner;

  return (
    <Pressable onPress={onPress} onPressIn={onPressIn} onPressOut={onPressOut} {...rest}>
      {inner}
    </Pressable>
  );
};

