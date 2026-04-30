import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
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
    <View 
      className="px-md pb-sm" 
      style={{ paddingTop: insets.top }}
    >
      <LiquidGlass
        borderRadius={Sizes.radiusMd}
        className="h-app-bar"
        pressable={false}
      >
        <View className="flex-1 flex-row items-center justify-between px-md">
          <View className="flex-row items-center">
            {showBack && (
              <TouchableOpacity onPress={onBackPress} className="mr-sm">
                <IconSymbol name="chevron.left" size={24} color={Colors.textPrimary} />
              </TouchableOpacity>
            )}
            <Text className="text-[20px] font-bold text-text-primary">{title}</Text>
          </View>
          <View className="flex-row items-center">{rightElement}</View>
        </View>
      </LiquidGlass>
    </View>
  );
};

