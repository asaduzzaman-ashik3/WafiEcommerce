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

import React, { useRef } from 'react';
import {
  StyleSheet,
  View,
  ViewStyle,
  Animated,
  Pressable,
  PressableProps,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { Colors } from '@/src/core/constants/colors';

export interface LiquidGlassProps extends PressableProps {
  children: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
  borderRadius?: number;
  blurIntensity?: number;
  /** If false, touch ripple animation is disabled */
  pressable?: boolean;
}

export const LiquidGlass: React.FC<LiquidGlassProps> = ({
  children,
  style,
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
    <Animated.View style={[styles.wrapper, { borderRadius }, { transform: [{ scale }] }, style]}>
      {/* Layer 1 — Blur */}
      <BlurView
        intensity={blurIntensity}
        tint="light"
        style={[StyleSheet.absoluteFill, { borderRadius }]}
      />

      {/* Layer 2 — Tint */}
      <View
        style={[
          StyleSheet.absoluteFill,
          styles.tint,
          { borderRadius },
        ]}
      />

      {/* Layer 3 — Shine border */}
      <View
        style={[
          StyleSheet.absoluteFill,
          styles.shine,
          { borderRadius },
        ]}
      />

      {/* Layer 4 — Content */}
      <View style={styles.content}>{children}</View>
    </Animated.View>
  );

  if (!pressable || !onPress) return inner;

  return (
    <Pressable onPress={onPress} onPressIn={onPressIn} onPressOut={onPressOut} {...rest}>
      {inner}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    overflow: 'hidden',
    // Outer shadow (mimics CSS box-shadow)
    shadowColor: Colors.glassShadow,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 1,
    shadowRadius: 16,
    elevation: 8,
    backgroundColor: 'transparent',
  },
  tint: {
    backgroundColor: 'rgba(255,255,255,0.22)',
  },
  shine: {
    // Inset-like highlight: top & left edges only
    borderWidth: 1.5,
    borderTopColor:  'rgba(255,255,255,0.80)',
    borderLeftColor: 'rgba(255,255,255,0.60)',
    borderRightColor: 'rgba(255,255,255,0.20)',
    borderBottomColor: 'rgba(255,255,255,0.20)',
    backgroundColor: 'transparent',
  },
  content: {
    flex: 1,
    position: 'relative',
    zIndex: 3,
  },
});
