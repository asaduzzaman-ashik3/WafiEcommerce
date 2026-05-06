import React from "react";
import {
  View,
  Text,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from "react-native";
import { LiquidGlass } from "@/components/shared/LiquidGlass";
import { Sizes } from "@/constants/sizes";
import { useTheme } from "@/context/ThemeContext";

interface AppButtonProps {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  loading?: boolean;
  disabled?: boolean;
  variant?: "primary" | "secondary" | "outline" | "solid";
}

export const AppButton: React.FC<AppButtonProps> = ({
  title,
  onPress,
  style,
  textStyle,
  loading,
  disabled,
  variant = "primary",
}) => {
  const { colors } = useTheme();

  const getBackgroundColor = () => {
    switch (variant) {
      case "primary":
        return colors.primary;
      case "secondary":
        return colors.secondary;
      case "solid":
        return colors.primary;
      case "outline":
        return "transparent";
      default:
        return colors.primary;
    }
  };

  const getTextColor = () => {
    switch (variant) {
      case "primary":
      case "secondary":
      case "solid":
        return "#FFFFFF";
      case "outline":
        return colors.primary;
      default:
        return "#FFFFFF";
    }
  };

  return (
    <LiquidGlass
      onPress={disabled || loading ? undefined : onPress}
      className={`h-14 px-xl min-w-[120px] ${disabled ? "opacity-50" : ""}`}
      style={[{ backgroundColor: getBackgroundColor() }, style]}
      borderRadius={Sizes.radiusFull}
      blurIntensity={variant === "solid" ? 0 : 30}
    >
      <View 
        className={`flex-1 items-center justify-center ${variant === 'outline' ? 'border' : ''}`}
        style={variant === 'outline' ? { borderColor: colors.primary, borderRadius: Sizes.radiusFull } : {}}
      >
        {loading ? (
          <ActivityIndicator color={getTextColor()} size="small" />
        ) : (
          <Text
            className="text-base font-bold text-center"
            style={[{ color: getTextColor() }, textStyle]}
          >
            {title}
          </Text>
        )}
      </View>
    </LiquidGlass>
  );
};
