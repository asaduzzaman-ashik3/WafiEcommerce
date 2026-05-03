import { Colors } from "@/constants/colors";
import { Sizes } from "@/constants/sizes";
import React from "react";
import { Text, TextInput, TextInputProps, View, ViewStyle } from "react-native";
import { LiquidGlass } from "@/components/shared/LiquidGlass";

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
  return (
    <View className="mb-md" style={containerStyle}>
      {label && (
        <Text className="text-xs font-semibold text-text-secondary mb-xs ml-xs">
          {label}
        </Text>
      )}
      <LiquidGlass
        borderRadius={Sizes.radiusMd}
        pressable={false}
        className="h-14 px-md justify-center"
      >
        <TextInput
          className="text-base text-text-primary font-medium"
          placeholderTextColor={Colors.textMuted}
          {...props}
        />
      </LiquidGlass>
      {error && (
        <Text className="text-[10px] text-red-600 mt-xs ml-xs">{error}</Text>
      )}
    </View>
  );
};
