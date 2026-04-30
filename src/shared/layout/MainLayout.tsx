import React from 'react';
import { View, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '@/src/core/constants/colors';
import { SafeAreaView } from 'react-native-safe-area-context';

interface MainLayoutProps {
  children: React.ReactNode;
}

const { width, height } = Dimensions.get('window');

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <View className="flex-1">
      {/* Background Gradient */}
      <LinearGradient
        colors={[
          Colors.gradientTop,
          Colors.gradientMid,
          Colors.gradientBottom,
        ]}
        locations={[0, 0.5, 1]}
        start={{ x: 0.1, y: 0 }}
        end={{ x: 0.9, y: 1 }}
        className="absolute inset-0"
      />

      {/* Glow blobs - Sage green glow */}
      <View
        className="absolute rounded-full"
        style={{
            top: -height * 0.1,
            left: -width * 0.2,
            width: width * 0.7,
            height: width * 0.7,
            backgroundColor: Colors.glowSage,
            opacity: 0.2,
        }}
      />

      {/* Warm amber glow */}
      <View
        className="absolute rounded-full"
        style={{
            bottom: -height * 0.1,
            right: -width * 0.2,
            width: width * 0.8,
            height: width * 0.8,
            backgroundColor: Colors.glowAmber,
            opacity: 0.15,
        }}
      />

      <SafeAreaView className="flex-1" edges={['right', 'left']}>
        {children}
      </SafeAreaView>
    </View>
  );
};

