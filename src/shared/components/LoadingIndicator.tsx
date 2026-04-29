import React from 'react';
import { View, ActivityIndicator, StyleSheet, Modal } from 'react-native';
import { LiquidGlass } from './LiquidGlass';
import { Colors } from '@/src/core/constants/colors';

interface LoadingIndicatorProps {
  visible: boolean;
}

export const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({ visible }) => {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <LiquidGlass borderRadius={20} style={styles.glass} pressable={false}>
          <View style={styles.content}>
            <ActivityIndicator size="large" color={Colors.primary} />
          </View>
        </LiquidGlass>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  glass: {
    width: 100,
    height: 100,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
