import { AppBar } from "@/components/shared/AppBar";
import { LiquidGlass } from "@/components/shared/LiquidGlass";
import { Sizes } from "@/constants/sizes";
import React from "react";
import { ScrollView, Text, View } from "react-native";
import { useTheme } from "@/context/ThemeContext";

export const OrdersScreen = () => {
  const { colors } = useTheme();

  const orders = [
    {
      id: "#W9823",
      date: "20 Oct, 2024",
      status: "Delivered",
      amount: "৳2,500",
    },
    {
      id: "#W9815",
      date: "18 Oct, 2024",
      status: "Processing",
      amount: "৳1,200",
    },
  ];

  return (
    <View className="flex-1">
      <AppBar title="My Orders" />
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {orders.map((order) => (
          <LiquidGlass
            key={order.id}
            className="mb-md"
            borderRadius={Sizes.radiusMd}
            pressable={false}
          >
            <View className="p-md">
              <View className="flex-row justify-between items-center mb-xs">
                <Text 
                  className="text-sm font-bold"
                  style={{ color: colors.textPrimary }}
                >
                  {order.id}
                </Text>
                <View
                  className="px-sm py-xs rounded-sm"
                  style={{
                    backgroundColor:
                      order.status === "Delivered"
                        ? colors.success + "20"
                        : colors.warning + "20",
                  }}
                >
                  <Text
                    className="text-[10px] font-semibold"
                    style={{
                      color:
                        order.status === "Delivered"
                          ? colors.success
                          : colors.warning,
                    }}
                  >
                    {order.status}
                  </Text>
                </View>
              </View>
              <Text 
                className="text-xs mb-md"
                style={{ color: colors.textMuted }}
              >
                {order.date}
              </Text>
              <View 
                className="flex-row justify-between items-center pt-sm"
                style={{ borderTopWidth: 1, borderTopColor: colors.border }}
              >
                <Text 
                  className="text-xs"
                  style={{ color: colors.textSecondary }}
                >
                  Total Amount
                </Text>
                <Text 
                  className="text-sm font-[800]"
                  style={{ color: colors.primary }}
                >
                  {order.amount}
                </Text>
              </View>
            </View>
          </LiquidGlass>
        ))}
      </ScrollView>
    </View>
  );
};
