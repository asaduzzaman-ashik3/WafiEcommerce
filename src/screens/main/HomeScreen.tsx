import { AppButton } from "@/components/shared/AppButton";
import { AppBar } from "@/components/shared/AppBar";
import { Carousel } from "@/components/shared/Carousel";
import { LiquidGlass } from "@/components/shared/LiquidGlass";
import { Sizes } from "@/constants/sizes";
import React from "react";
import { ScrollView, Text, View } from "react-native";

export const HomeScreen = () => {
  return (
    <View className="flex-1">
      <AppBar title="Wafi Ecommerce" />

      <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
        <Carousel></Carousel>

        <View className="mt-sm">
          <View className="flex-row">
            <AppButton
              title="Categories"
              onPress={() => {}}
              variant="outline"
              className="flex-1"
            />
            <View style={{ width: Sizes.md }} />
            <AppButton title="Deals" onPress={() => {}} className="flex-1" />
          </View>
        </View>

        <Text className="text-[24px] font-[800] text-text-primary mb-md mt-lg">
          Recent Items
        </Text>
        <View className="flex-row flex-wrap justify-between">
          {[1, 2, 3, 4].map((item) => (
            <LiquidGlass
              key={item}
              className="w-[48%] h-[220px] mb-md"
              borderRadius={Sizes.radiusMd}
            >
              <View
                className="h-[140px] bg-white/30"
                style={{
                  borderTopLeftRadius: Sizes.radiusMd,
                  borderTopRightRadius: Sizes.radiusMd,
                }}
              />
              <View className="p-sm">
                <Text className="text-xs font-bold text-text-primary">
                  Premium Item {item}
                </Text>
                <Text className="text-base font-[800] text-secondary mt-xs">
                  ৳2,500
                </Text>
              </View>
            </LiquidGlass>
          ))}
        </View>

        {/* Padding for bottom nav */}
        <View className="h-[100px]" />
      </ScrollView>
    </View>
  );
};
