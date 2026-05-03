// src/shared/components/LiquidGlass.tsx
import { Colors } from '@/constants/colors';
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
  pressable?: boolean;
}

export const LiquidGlass: React.FC<LiquidGlassProps> = ({
  children,
  style,
  className,
  borderRadius = 24,
  blurIntensity = 80,           // ← raised from 22 → 80 (near-max on 0–100 scale)
  pressable = true,
  onPress,
  ...rest
}) => {
  const scale = useRef(new Animated.Value(1)).current;
  const rippleScale = useRef(new Animated.Value(0)).current;
  const rippleOpacity = useRef(new Animated.Value(0)).current;

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
        style,
      ]}
    >
      {/* Layer 1a — Primary heavy blur (most of the frosting work) */}
      <BlurView
        intensity={blurIntensity}          // up to 100
        tint="light"
        experimentalBlurMethod="dimezisBlurView"  // ← stronger blur engine on Android
        className="absolute inset-0"
        style={{ borderRadius }}
      />

      {/* Layer 1b — Second blur pass for extra depth */}
      <BlurView
        intensity={Math.round(blurIntensity * 0.5)}  // secondary pass at half intensity
        tint="light"
        experimentalBlurMethod="dimezisBlurView"
        className="absolute inset-0"
        style={{ borderRadius }}
      />

      {/* Layer 2 — Tint removed for transparency */}
      <View
        className="absolute inset-0 bg-transparent"
        style={{ borderRadius }}
      />

      {/* Layer 3 — Shine border */}
      <View
        className="absolute inset-0 border-[1.5px] border-t-white/80 border-l-white/60 border-r-white/20 border-b-white/20 bg-transparent"
        style={{ borderRadius }}
      />

      {/* Ripple Layer */}
      <Animated.View
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: 200,
          height: 200,
          marginLeft: -100,
          marginTop: -100,
          borderRadius: 100,
          backgroundColor: 'white',
          opacity: rippleOpacity,
          transform: [{ scale: rippleScale }],
          zIndex: 1,
        }}
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
