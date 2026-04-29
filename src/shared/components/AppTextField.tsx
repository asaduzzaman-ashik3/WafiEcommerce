import React from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TextInputProps,
  ViewStyle,
} from 'react-native';
import { LiquidGlass } from './LiquidGlass';
import { Colors } from '@/src/core/constants/colors';
import { Sizes } from '@/src/core/constants/sizes';

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
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <LiquidGlass
        borderRadius={Sizes.radiusMd}
        pressable={false}
        style={styles.glass}
      >
        <TextInput
          style={styles.input}
          placeholderTextColor={Colors.textMuted}
          {...props}
        />
      </LiquidGlass>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: Sizes.md,
  },
  label: {
    fontSize: Sizes.fontSm,
    fontWeight: '600',
    color: Colors.textSecondary,
    marginBottom: Sizes.xs,
    marginLeft: Sizes.xs,
  },
  glass: {
    height: 56,
    paddingHorizontal: Sizes.md,
    justifyContent: 'center',
  },
  input: {
    fontSize: Sizes.fontBase,
    color: Colors.textPrimary,
    fontWeight: '500',
  },
  errorText: {
    fontSize: Sizes.fontXs,
    color: Colors.error,
    marginTop: Sizes.xs,
    marginLeft: Sizes.xs,
  },
});
