import { Tabs } from 'expo-router';
import React from 'react';
import { BottomNavBar } from '@/src/shared/components/BottomNavBar';

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <BottomNavBar {...props} />}
      screenOptions={{
        headerShown: false,
        sceneStyle: { backgroundColor: 'transparent' },
        animationEnabled: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          title: 'Orders',
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: 'Cart',
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
        }}
      />
    </Tabs>
  );
}
