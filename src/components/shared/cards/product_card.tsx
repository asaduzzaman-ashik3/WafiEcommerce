import { LiquidGlass } from "@/components/shared/LiquidGlass";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Sizes } from "@/constants/sizes";
import { useTheme } from "@/context/ThemeContext";
import { Product } from "@/types/product";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface ProductCardProps {
  item: Product;
  cardWidth: number;
  isLast?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  item,
  cardWidth,
  isLast,
}) => {
  const { colors } = useTheme();

  return (
    <View
      style={{ width: cardWidth }}
      className={isLast ? "" : "mr-md"}
    >
      <LiquidGlass
        className="overflow-hidden"
        borderRadius={Sizes.radiusMd}
        pressable={false}
      >
        <View className="relative">
          <View
            className="h-[160px] w-full items-center justify-center"
            style={{ backgroundColor: colors.primary + "05" }}
          >
            <Image
              source={{ uri: item.image_url[0] }}
              style={{
                width: "100%",
                height: "100%",
                resizeMode: "cover",
              }}
            />
            <View className="absolute inset-0 items-center justify-center -z-10">
              <IconSymbol
                name="photo.fill"
                size={32}
                color={colors.primary + "40"}
              />
            </View>
          </View>

          {item.discount_tag && (
            <View
              className="absolute top-2 left-2 px-2 py-1 rounded-full"
              style={{ backgroundColor: colors.secondary }}
            >
              <Text className="text-[10px] font-bold text-white">
                {item.discount_tag}
              </Text>
            </View>
          )}
        </View>

        <View className="p-sm">
          <Text
            className="text-sm font-bold"
            style={{ color: colors.textPrimary }}
            numberOfLines={1}
          >
            {item.title}
          </Text>

          <View className="flex-row items-center justify-between mt-xs">
            <View className="flex-row gap-1 items-center">
              <Text
                className="text-md font-bold"
                style={{ color: colors.primary }}
              >
                ৳{item.discount_price}
              </Text>
              {item.original_price > item.discount_price && (
                <Text
                  className="text-[11px] line-through"
                  style={{ color: colors.primary + "80" }}
                >
                  ৳{item.original_price}
                </Text>
              )}
            </View>
          </View>

          <TouchableOpacity
            className="mt-sm py-2 rounded-lg items-center justify-center shadow-sm"
            style={{ backgroundColor: colors.primary }}
            onPress={() => {}}
            activeOpacity={0.8}
          >
            <Text className="text-white text-xs font-bold">
              Add to Cart
            </Text>
          </TouchableOpacity>
        </View>
      </LiquidGlass>
    </View>
  );
};
