import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { DrawerContentScrollView, DrawerContentComponentProps } from '@react-navigation/drawer';
import { Colors } from '@/src/core/constants/colors';
import { Sizes } from '@/src/core/constants/sizes';
import { LiquidGlass } from './LiquidGlass';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const AppDrawer: React.FC<DrawerContentComponentProps> = (props) => {
  const insets = useSafeAreaInsets();

  const menuItems = [
    { label: 'Home', icon: 'house.fill', route: '(tabs)' },
    { label: 'Categories', icon: 'square.grid.2x2.fill', route: 'categories' },
    { label: 'My Orders', icon: 'bag.fill', route: 'orders' },
    { label: 'Wishlist', icon: 'heart.fill', route: 'wishlist' },
    { label: 'Settings', icon: 'gearshape.fill', route: 'settings' },
    { label: 'Help & Support', icon: 'questionmark.circle.fill', route: 'support' },
  ];

  return (
    <View className="flex-1 bg-transparent">
      <DrawerContentScrollView 
        {...props} 
        scrollEnabled={false}
        contentContainerStyle={{ paddingTop: 0 }}
      >
        <View style={{ paddingTop: insets.top + Sizes.md }} className=" pb-xl">
          <LiquidGlass borderRadius={20} className="p-md mb-xl" pressable={false}>
            <View className="flex-row items-center">
              <View className="w-14 h-14 rounded-full bg-primary/20 items-center justify-center mr-md">
                <IconSymbol name="person.fill" size={32} color={Colors.primary} />
              </View>
              <View>
                <Text className="text-lg font-bold text-text-primary">Wafi User</Text>
                <Text className="text-xs text-text-secondary">premium member</Text>
              </View>
            </View>
          </LiquidGlass>

          <View className="gap-y-2">
            {menuItems.map((item, index) => (
              <TouchableOpacity 
                key={index}
                className="flex-row items-center p-md rounded-xl"
                onPress={() => props.navigation.navigate(item.route as any)}
              >
                <View className="w-10 h-10 rounded-full bg-white/40 items-center justify-center mr-md">
                   <IconSymbol name={item.icon as any} size={20} color={Colors.primary} />
                </View>
                <Text className="text-base font-semibold text-text-primary">{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </DrawerContentScrollView>

      {/* Footer / Logout */}
      <View style={{ paddingBottom: insets.bottom + Sizes.lg }} className="px-lg">
        <TouchableOpacity className="flex-row items-center p-md bg-red-50/50 rounded-xl">
           <IconSymbol name="arrow.left.square.fill" size={20} color={Colors.error} />
           <Text className="ml-md text-base font-bold text-red-600">Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
