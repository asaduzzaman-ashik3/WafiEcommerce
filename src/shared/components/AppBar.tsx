import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LiquidGlass } from './LiquidGlass';
import { Colors } from '@/src/core/constants/colors';
import { Sizes } from '@/src/core/constants/sizes';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { IconSymbol } from '@/components/ui/icon-symbol';

interface AppBarProps {
  title: string;
  showBack?: boolean;
  onBackPress?: () => void;
  rightElement?: React.ReactNode;
}

export const AppBar: React.FC<AppBarProps> = ({
  title,
  showBack,
  onBackPress,
  rightElement,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <LiquidGlass
        borderRadius={Sizes.radiusMd}
        style={styles.glass}
        pressable={false}
      >
        <View style={styles.content}>
          <View style={styles.left}>
            {showBack && (
              <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
                <IconSymbol name="chevron.left" size={24} color={Colors.textPrimary} />
              </TouchableOpacity>
            )}
            <Text style={styles.title}>{title}</Text>
          </View>
          <View style={styles.right}>{rightElement}</View>
        </View>
      </LiquidGlass>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Sizes.md,
    paddingBottom: Sizes.sm,
  },
  glass: {
    height: Sizes.appBarHeight,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Sizes.md,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: Sizes.sm,
  },
  title: {
    fontSize: Sizes.fontLg,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
