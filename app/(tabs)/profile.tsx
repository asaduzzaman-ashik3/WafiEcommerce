import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AppBar } from '@/src/shared/components/AppBar';
import { Colors } from '@/src/core/constants/colors';
import { Sizes } from '@/src/core/constants/sizes';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <AppBar title="Profile" />
      <View style={styles.content}>
        <Text style={styles.text}>Profile information will appear here</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: Sizes.fontMd,
    color: Colors.textMuted,
  },
});
