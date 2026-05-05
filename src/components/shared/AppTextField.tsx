import { Sizes } from "@/constants/sizes";
import React from "react";
import { Text, TextInput, TextInputProps, View, ViewStyle } from "react-native";
import { LiquidGlass } from "@/components/shared/LiquidGlass";
import { useTheme } from "@/context/ThemeContext";

interface AppTextFieldProps extends TextInputProps {
  label?: string;
  error?: string;
  containerStyle?: ViewStyle;
}

export const AppTextField: React.FC<AppTextFieldProps> = ({
  label,
  error,
  containerStyle,
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
        className="h-14 px-md justify-center"
      >
        <TextInput
          className="text-base font-medium"
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
