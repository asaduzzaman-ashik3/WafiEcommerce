import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '@/src/core/constants/colors';
import { SafeAreaView } from 'react-native-safe-area-context';

interface MainLayoutProps {
  children: React.ReactNode;
}

const { width, height } = Dimensions.get('window');

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <View style={styles.container}>
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
        style={StyleSheet.absoluteFill}
      />

      {/* Glow blobs - Sage green glow */}
      <View
        style={[
          styles.glowBlob,
          {
            top: -height * 0.1,
            left: -width * 0.2,
            width: width * 0.7,
            height: width * 0.7,
            backgroundColor: Colors.glowSage,
            opacity: 0.2,
          },
        ]}
      />

      {/* Warm amber glow */}
      <View
        style={[
          styles.glowBlob,
          {
            bottom: -height * 0.1,
            right: -width * 0.2,
            width: width * 0.8,
            height: width * 0.8,
            backgroundColor: Colors.glowAmber,
            opacity: 0.15,
          },
        ]}
      />

      <SafeAreaView style={styles.content} edges={['right', 'left']}>
        {children}
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  glowBlob: {
    position: 'absolute',
    borderRadius: 999,
  },
  content: {
    flex: 1,
  },
});
