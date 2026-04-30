import { Sizes } from "@/src/core/constants/sizes";
import { AppBar } from "@/src/shared/components/AppBar";
import { AppButton } from "@/src/shared/components/AppButton";
import { LiquidGlass } from "@/src/shared/components/LiquidGlass";
import React from "react";
import { ScrollView, Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <View className="flex-1">
      <AppBar title="Wafi Ecommerce" />

      <ScrollView
        contentContainerStyle={{ padding: 16 }} // Using raw value for padding to avoid scrollContent style object
        className="flex-1"
        showsVerticalScrollIndicator={false}
      >
        <LiquidGlass className="h-[200px] mb-lg" borderRadius={Sizes.radiusLg}>
          <View className="flex-1 p-lg justify-center">
            <Text className="text-[32px] font-[900] text-primary">New Collection</Text>
            <Text className="text-base text-text-secondary mt-xs mb-lg">
              Explore the latest trends in fashion and lifestyle.
            </Text>
            <AppButton
              title="Shop Now"
              onPress={() => {}}
              style={{ height: 48 }}
            />
          </View>
        </LiquidGlass>

        <View className="mt-sm">
          <View className="flex-row">
            <AppButton
              title="Categories"
              onPress={() => {}}
              variant="outline"
              className="flex-1"
            />
            <View style={{ width: Sizes.md }} />
            <AppButton
              title="Deals"
              onPress={() => {}}
              className="flex-1"
            />
          </View>
        </View>

        <Text className="text-[24px] font-[800] text-text-primary mb-md mt-lg">Recent Items</Text>
        <View className="flex-row flex-wrap justify-between">
          {[1, 2, 3, 4].map((item) => (
            <LiquidGlass
              key={item}
              className="w-[48%] h-[220px] mb-md"
              borderRadius={Sizes.radiusMd}
            >
              <View 
                className="h-[140px] bg-white/30" 
                style={{ borderTopLeftRadius: Sizes.radiusMd, borderTopRightRadius: Sizes.radiusMd }}
              />
              <View className="p-sm">
                <Text className="text-xs font-bold text-text-primary">Premium Item {item}</Text>
                <Text className="text-base font-[800] text-secondary mt-xs">৳2,500</Text>
              </View>
            </LiquidGlass>
          ))}
        </View>

        {/* Padding for bottom nav */}
        <View className="h-[100px]" />
      </ScrollView>
    </View>
  );
}

