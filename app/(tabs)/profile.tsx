import { AppBar } from '@/src/shared/components/AppBar';
import React from 'react';
import { Text, View } from 'react-native';

export default function ProfileScreen() {
  return (
    <View className="flex-1">
      <AppBar title="Profile" />
      <View className="flex-1 items-center justify-center">
        <Text className="text-sm text-text-muted">Profile information will appear here</Text>
      </View>
    </View>
  );
}

