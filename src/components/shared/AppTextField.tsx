import { Sizes } from "@/constants/sizes";
import React from "react";
import { Text, TextInput, TextInputProps, View, ViewStyle } from "react-native";
import { LiquidGlass } from "@/components/shared/LiquidGlass";
import { useTheme } from "@/context/ThemeContext";

interface AppTextFieldProps extends TextInputProps {
  label?: string;
  error?: string;
  containerStyle?: ViewStyle;
  leftIcon?: React.ReactNode;
}

export const AppTextField: React.FC<AppTextFieldProps> = ({
  label,
  error,
  containerStyle,
  leftIcon,
  ...props
}) => {
  const { colors } = useTheme();

  return (
    <View className="mb-md" style={containerStyle}>
      {label && (
        <Text 
          className="text-xs font-semibold mb-xs ml-xs"
          style={{ color: colors.textSecondary }}
        >
          {label}
        </Text>
      )}
      <LiquidGlass
        borderRadius={Sizes.radiusMd}
        pressable={false}
        className="h-14 px-md flex-row items-center"
      >
        {leftIcon && <View className="mr-sm">{leftIcon}</View>}
        <TextInput
          className="flex-1 text-base font-medium"
          style={{ color: colors.textPrimary }}
          placeholderTextColor={colors.textMuted}
          {...props}
        />
      </LiquidGlass>
      {error && (
        <Text className="text-[10px] text-red-600 mt-xs ml-xs">{error}</Text>
      )}
    </View>
  );
};
