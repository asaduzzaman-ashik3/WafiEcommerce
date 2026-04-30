import React from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { LiquidGlass } from './LiquidGlass';
import { Colors } from '@/src/core/constants/colors';
import { Sizes } from '@/src/core/constants/sizes';

interface AppButtonProps {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  loading?: boolean;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'outline';
}

export const AppButton: React.FC<AppButtonProps> = ({
  title,
  onPress,
  style,
  textStyle,
  loading,
  disabled,
  variant = 'primary',
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return 'bg-primary-pale';
      case 'secondary':
        return 'bg-secondary-pale';
      case 'outline':
        return 'bg-transparent border border-primary';
      default:
        return 'bg-primary-pale';
    }
  };

  const getTextColor = () => {
    switch (variant) {
      case 'primary': return Colors.primary;
      case 'secondary': return Colors.secondary;
      case 'outline': return Colors.primary;
      default: return Colors.primary;
    }
  };

  return (
    <LiquidGlass
      onPress={disabled || loading ? undefined : onPress}
      className={`h-14 px-xl min-w-[120px] ${getVariantClasses()} ${disabled ? 'opacity-50' : ''}`}
      style={style}
      borderRadius={Sizes.radiusFull}
    >
      <View className="flex-1 items-center justify-center">
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

