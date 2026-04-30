import { AppBar } from '@/src/shared/components/AppBar';
import React from 'react';
import { Text, View } from 'react-native';

export default function CartScreen() {
  return (
    <View className="flex-1">
      <AppBar title="My Cart" />
      <View className="flex-1 items-center justify-center">
        <Text className="text-sm text-text-muted">Your cart is empty</Text>
      </View>
    </View>
  );
}

