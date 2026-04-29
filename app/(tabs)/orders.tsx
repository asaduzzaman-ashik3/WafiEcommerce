import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { AppBar } from '@/src/shared/components/AppBar';
import { LiquidGlass } from '@/src/shared/components/LiquidGlass';
import { Colors } from '@/src/core/constants/colors';
import { Sizes } from '@/src/core/constants/sizes';

export default function OrdersScreen() {
  const orders = [
    { id: '#W9823', date: '20 Oct, 2024', status: 'Delivered', amount: '৳2,500' },
    { id: '#W9815', date: '18 Oct, 2024', status: 'Processing', amount: '৳1,200' },
  ];

  return (
    <View style={styles.container}>
      <AppBar title="My Orders" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {orders.map((order) => (
          <LiquidGlass key={order.id} style={styles.orderCard} borderRadius={Sizes.radiusMd} pressable={false}>
            <View style={styles.cardContent}>
              <View style={styles.header}>
                <Text style={styles.orderId}>{order.id}</Text>
                <View style={[styles.statusBadge, { backgroundColor: order.status === 'Delivered' ? Colors.success + '20' : Colors.warning + '20' }]}>
                  <Text style={[styles.statusText, { color: order.status === 'Delivered' ? Colors.success : Colors.warning }]}>{order.status}</Text>
                </View>
              </View>
              <Text style={styles.date}>{order.date}</Text>
              <View style={styles.footer}>
                <Text style={styles.totalLabel}>Total Amount</Text>
                <Text style={styles.amount}>{order.amount}</Text>
              </View>
            </View>
          </LiquidGlass>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: Sizes.md,
  },
  orderCard: {
    marginBottom: Sizes.md,
  },
  cardContent: {
    padding: Sizes.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Sizes.xs,
  },
  orderId: {
    fontSize: Sizes.fontMd,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  statusBadge: {
    paddingHorizontal: Sizes.sm,
    paddingVertical: Sizes.xs,
    borderRadius: Sizes.radiusSm,
  },
  statusText: {
    fontSize: Sizes.fontXs,
    fontWeight: '600',
  },
  date: {
    fontSize: Sizes.fontSm,
    color: Colors.textMuted,
    marginBottom: Sizes.md,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.05)',
    paddingTop: Sizes.sm,
  },
  totalLabel: {
    fontSize: Sizes.fontSm,
    color: Colors.textSecondary,
  },
  amount: {
    fontSize: Sizes.fontMd,
    fontWeight: '800',
    color: Colors.primary,
  },
});
