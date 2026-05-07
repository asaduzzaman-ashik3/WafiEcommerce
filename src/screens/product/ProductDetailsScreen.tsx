import { AppBar } from "@/components/shared/AppBar";
import { Sizes, window } from "@/constants/sizes";
import { useTheme } from "@/context/ThemeContext";
import { Product } from "@/types/product";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState, useMemo, useRef } from "react";
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ReanimatedCarousel, { ICarouselInstance } from "react-native-reanimated-carousel";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const TABS = ["Description", "Specification", "Review"];

const MOCK_PRODUCT: Product = {
  id: 1,
  title: "Premium Wireless Headphones",
  discount_price: 1250,
  original_price: 1800,
  image_url: [
    "https://picsum.photos/800/800?random=1",
    "https://picsum.photos/800/800?random=2",
    "https://picsum.photos/800/800?random=3",
  ],
  description: "Experience world-class audio with these premium wireless headphones. Featuring active noise cancellation, 40-hour battery life, and superior comfort for long listening sessions.",
  brand_name: "Wafi Audio",
  category_name: "Electronics",
  discount_tag: "30% OFF",
  label_tag: "Best Seller",
  tags: ["Wireless", "Noise Cancelling", "Premium"],
};

export const ProductDetailsScreen = () => {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams();
  const productData = params.productData;
  const id = params.id;
  const carouselRef = useRef<ICarouselInstance>(null);
  
  const product: Product = useMemo(() => {
    if (!productData) return { ...MOCK_PRODUCT, id: Number(id) || 1 };
    try {
      const data = typeof productData === 'string' ? JSON.parse(productData) : productData;
      return data as Product;
    } catch (e) {
      return { ...MOCK_PRODUCT, id: Number(id) || 1 };
    }
  }, [productData, id]);

  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const totalPrice = product.discount_price * quantity;

  return (
    <View className="flex-1" style={{ backgroundColor: colors.background }}>
      <AppBar title="Details" showBack onBackPress={() => router.back()} />
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingTop: insets.top + Sizes.appBarHeight }}>
        <View style={{ height: window.height * 0.45 }} className="relative overflow-hidden bg-white">
          <ReanimatedCarousel
            ref={carouselRef}
            loop
            width={window.width}
            height={window.height * 0.45}
            autoPlay={true}
            autoPlayInterval={5000}
            data={product.image_url}
            onSnapToItem={(index) => setActiveIndex(index)}
            renderItem={({ item }) => (
              <View className="w-full h-full">
                <Image source={{ uri: item }} className="w-full h-full" resizeMode="cover" />
              </View>
            )}
          />
          
          {/* Thumbnail Selector at the bottom of carousel */}
          <View className="absolute bottom-4 left-0 right-0 flex-row justify-center gap-3 px-md">
            {product.image_url.map((img, index) => (
              <TouchableOpacity 
                key={index} 
                onPress={() => carouselRef.current?.scrollTo({ index, animated: true })}
                className="overflow-hidden border-2"
                style={{ 
                  width: 54, 
                  height: 54, 
                  borderRadius: 6,
                  borderColor: activeIndex === index ? colors.primary : "transparent",
                  backgroundColor: "white",
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 4,
                  elevation: 3
                }}
              >
                <Image source={{ uri: img }} className="w-full h-full" resizeMode="cover" />
                {activeIndex !== index && <View className="absolute inset-0 bg-black/20" />}
              </TouchableOpacity>
            ))}
          </View>

          {product.discount_tag ? (
            <View className="absolute top-4 left-4 px-3 py-1 rounded-full shadow-lg" style={{ backgroundColor: colors.secondary }}>
              <Text className="text-white font-bold text-[10px] uppercase">{String(product.discount_tag)}</Text>
            </View>
          ) : null}
        </View>

        <View className="p-md bg-white rounded-t-[32px]" style={{ backgroundColor: colors.surface }}>
          <View className="flex-row justify-between items-start">
            <View className="flex-1">
              <Text className="text-[12px] uppercase font-bold tracking-widest" style={{ color: colors.primary }}>{String(product.category_name)}</Text>
              <Text className="text-2xl font-bold mt-1" style={{ color: colors.textPrimary }}>{String(product.title)}</Text>
              <Text className="text-xs mt-1" style={{ color: colors.textSecondary }}>
                <Text>By </Text>
                <Text className="font-bold" style={{ color: colors.primary }}>{String(product.brand_name)}</Text>
              </Text>
            </View>
            <TouchableOpacity className="w-10 h-10 rounded-full items-center justify-center shadow-sm border border-gray-100" style={{ backgroundColor: colors.surface }}>
              <IconSymbol name="heart" size={20} color={colors.primary} />
            </TouchableOpacity>
          </View>

          <View className="flex-row items-center justify-between mt-lg bg-gray-50 p-4 rounded-2xl" style={{ backgroundColor: colors.background }}>
            <View>
              <View className="flex-row items-center gap-2">
                <Text className="text-2xl font-bold" style={{ color: colors.primary }}>৳{String(product.discount_price)}</Text>
                {product.original_price > product.discount_price ? (
                  <Text className="text-sm line-through" style={{ color: colors.textSecondary }}>৳{String(product.original_price)}</Text>
                ) : null}
              </View>
              <Text className="text-[10px] text-gray-400 mt-1">Inclusive of all taxes</Text>
            </View>
            <View className="flex-row items-center bg-white rounded-xl p-1 shadow-sm">
              <TouchableOpacity onPress={decrementQuantity} className="w-8 h-8 items-center justify-center rounded-lg bg-gray-50">
                <IconSymbol name="minus" size={14} color={colors.textPrimary} />
              </TouchableOpacity>
              <Text className="mx-4 text-base font-bold" style={{ color: colors.textPrimary }}>{String(quantity)}</Text>
              <TouchableOpacity onPress={incrementQuantity} className="w-8 h-8 items-center justify-center rounded-lg bg-gray-50">
                <IconSymbol name="plus" size={14} color={colors.textPrimary} />
              </TouchableOpacity>
            </View>
          </View>
          
          <View className="mt-xl">
            <View className="flex-row border-b border-gray-100" style={{ borderColor: colors.primary + "10" }}>
              {TABS.map((tab, index) => (
                <TouchableOpacity key={tab} onPress={() => setActiveTab(index)} className="flex-1 items-center pb-3 relative">
                  <Text className={`font-bold ${activeTab === index ? "" : "opacity-40"}`} style={{ color: activeTab === index ? colors.primary : colors.textPrimary, fontSize: Sizes.fontMd }}>{String(tab)}</Text>
                  {activeTab === index ? (
                    <View className="absolute bottom-0 left-0 right-0 h-1 rounded-full" style={{ backgroundColor: colors.primary }} />
                  ) : null}
                </TouchableOpacity>
              ))}
            </View>
            <View className="mt-lg min-h-[150px]">
              {activeTab === 0 ? (
                <Text className="leading-6 text-[15px]" style={{ color: colors.textSecondary }}>{String(product.description)}</Text>
              ) : null}
              {activeTab === 1 ? (
                <View className="gap-3">
                  {[
                    { label: "Model", value: "WF-2026-X" },
                    { label: "Type", value: "Over-Ear" },
                    { label: "Battery", value: "40 Hours" },
                    { label: "Connectivity", value: "Bluetooth 5.2" },
                    { label: "Weight", value: "280g" },
                  ].map((item, idx) => (
                    <View key={idx} className="flex-row justify-between py-3 border-b border-gray-50" style={{ borderBottomColor: colors.primary + "05" }}>
                      <Text className="text-gray-400">{String(item.label)}</Text>
                      <Text className="font-bold" style={{ color: colors.textPrimary }}>{String(item.value)}</Text>
                    </View>
                  ))}
                </View>
              ) : null}
              {activeTab === 2 ? (
                <View className="py-4">
                  <View className="flex-row items-center gap-4 mb-6">
                    <View className="w-20 h-20 rounded-full bg-yellow-50 items-center justify-center border-2 border-yellow-200">
                      <Text className="text-2xl font-bold text-yellow-600">4.8</Text>
                    </View>
                    <View className="flex-1">
                      <View className="flex-row gap-1">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <IconSymbol key={s} name="star.fill" size={16} color="#FFD700" />
                        ))}
                      </View>
                      <Text className="text-xs text-gray-500 mt-1">Based on 2.4k verified purchases</Text>
                    </View>
                  </View>
                  <View className="p-4 rounded-2xl bg-gray-50" style={{ backgroundColor: colors.surface }}>
                    <View className="flex-row justify-between items-center mb-2">
                      <Text className="font-bold">John Doe</Text>
                      <Text className="text-[10px] text-gray-400">2 days ago</Text>
                    </View>
                    <Text className="text-sm text-gray-600 italic">"Amazing sound quality and very comfortable for long hours!"</Text>
                  </View>
                </View>
              ) : null}
            </View>
          </View>
          <View className="h-32" />
        </View>
      </ScrollView>
      <View className="absolute bottom-0 left-0 right-0 p-md pb-lg shadow-2xl" style={{ backgroundColor: colors.surface, borderTopLeftRadius: 32, borderTopRightRadius: 32, paddingBottom: insets.bottom + 12 }}>
        <View className="flex-row items-center justify-between">
          <View>
            <Text className="text-[10px] text-gray-400 uppercase tracking-tighter">Total Amount</Text>
            <Text className="text-xl font-bold" style={{ color: colors.primary }}>৳{String(totalPrice)}</Text>
          </View>
          <View className="flex-row gap-2">
            <TouchableOpacity className="px-5 h-12 rounded-xl items-center justify-center flex-row gap-2" style={{ backgroundColor: colors.primary + "15" }}>
              <IconSymbol name="bag.fill" size={18} color={colors.primary} />
              <Text className="font-bold" style={{ color: colors.primary }}>Add to Cart</Text>
            </TouchableOpacity>
            <TouchableOpacity className="px-6 h-12 rounded-xl items-center justify-center shadow-lg shadow-primary/30" style={{ backgroundColor: colors.primary }}>
              <Text className="text-white font-bold">Buy Now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};
