import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/src/core/constants/colors';
import { Sizes } from '@/src/core/constants/sizes';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LiquidGlass } from './LiquidGlass';

export const BottomNavBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View 
      className="absolute bottom-0 left-0 right-0 px-lg bg-transparent" 
      style={{ paddingBottom: insets.bottom + Sizes.sm }}
    >
      <LiquidGlass
        borderRadius={32}
        className="h-[80px]"
        pressable={false}
      >
        <View className="flex-1 flex-row items-center justify-around px-sm">
          {state.routes.map((route, index) => {
            const { options } = descriptors[route.key];
            const label = options.title !== undefined ? options.title : route.name;

            const isFocused = state.index === index;

            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            };

            const getIcon = (name: string, color: string) => {
              let iconName: any = 'house.fill';
              if (name === 'index') iconName = 'house.fill';
              if (name === 'orders') iconName = 'bag.fill';
              if (name === 'cart') iconName = 'cart.fill';
              if (name === 'profile') iconName = 'person.fill';
              return <IconSymbol size={22} name={iconName} color={color} />;
            };

            return (
              <TouchableOpacity
                key={index}
                onPress={onPress}
                className="flex-col items-center justify-center flex-1"
                activeOpacity={0.7}
              >
                <View className={`w-[42px] h-[42px] items-center justify-center rounded-full mb-[2px] overflow-hidden ${isFocused ? 'bg-primary/10' : ''}`}>
                   {getIcon(route.name, isFocused ? Colors.primary : Colors.textSecondary)}
                </View>
                <Text className={`text-[10px] font-semibold ${isFocused ? 'text-primary' : 'text-text-secondary'}`}>{label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </LiquidGlass>
    </View>
  );
};

