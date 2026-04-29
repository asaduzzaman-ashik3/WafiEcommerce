import React from 'react';
import {
  View,
  Text,
  StyleSheet,
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
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: Colors.primaryPale,
          color: Colors.primary,
        };
      case 'secondary':
        return {
          backgroundColor: Colors.secondaryPale,
          color: Colors.secondary,
        };
      case 'outline':
        return {
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderColor: Colors.primary,
          color: Colors.primary,
        };
      default:
        return {
          backgroundColor: Colors.primaryPale,
          color: Colors.primary,
        };
    }
  };

  const vStyles = getVariantStyles();

  return (
    <LiquidGlass
      onPress={disabled || loading ? undefined : onPress}
      style={[
        styles.button,
        style,
        disabled && styles.disabled,
      ]}
      borderRadius={Sizes.radiusFull}
    >
      <View style={styles.innerContent}>
        {loading ? (
          <ActivityIndicator color={vStyles.color} size="small" />
        ) : (
          <Text style={[styles.text, { color: vStyles.color }, textStyle]}>
            {title}
          </Text>
        )}
      </View>
    </LiquidGlass>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 56,
    paddingHorizontal: Sizes.xl,
    minWidth: 120,
  },
  innerContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: Sizes.fontBase,
    fontWeight: '700',
    textAlign: 'center',
  },
  disabled: {
    opacity: 0.5,
  },
});
