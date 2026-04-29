import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { LiquidGlass } from './LiquidGlass';
import { Colors } from '@/src/core/constants/colors';
import { Sizes } from '@/src/core/constants/sizes';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';

export const BottomNavBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom + Sizes.sm }]}>
      <LiquidGlass
        borderRadius={32}
        style={styles.glass}
        pressable={false}
      >
        <View style={styles.content}>
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
                style={styles.tabItem}
                activeOpacity={0.7}
              >
                <View style={[styles.iconContainer, isFocused && styles.activeIconContainer]}>
                   {getIcon(route.name, isFocused ? Colors.primary : Colors.textSecondary)}
                </View>
                <Text style={[styles.label, isFocused && styles.activeLabel]}>{label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </LiquidGlass>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: Sizes.lg,
    backgroundColor: 'transparent',
  },
  glass: {
    height: 80,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: Sizes.sm,
  },
  tabItem: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 42,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 21,
    marginBottom: 2,
    overflow: 'hidden',
  },
  activeIconContainer: {
    backgroundColor: 'rgba(58, 107, 42, 0.12)',
  },
  label: {
    fontSize: 10,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  activeLabel: {
    color: Colors.primary,
  },
});
