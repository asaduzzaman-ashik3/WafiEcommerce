import { AppBar } from "@/components/shared/AppBar";
import { Carousel } from "@/components/shared/Carousel";
import { LiquidGlass } from "@/components/shared/LiquidGlass";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { BannerSkeleton } from "@/components/ui/skeleton/BannerSkeleton";
import { CategoriesSkeleton } from "@/components/ui/skeleton/Categories_skeleton";
import { Colors } from "@/constants/colors";
import { Sizes } from "@/constants/sizes";
import { HomeService } from "@/services/home_service";
import { Banner } from "@/types/banner_types";
import { BookCategory } from "@/types/book_category";
import { Product } from "@/types/product";
import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import Toast from "react-native-toast-message";

export const HomeScreen = () => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loadingBanners, setLoadingBanners] = useState(true);
  const [categories, setCategories] = useState<BookCategory[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  const { width: windowWidth } = useWindowDimensions();
  // Calculate card width: (Total Width - Container Padding (16*2) - Gap between cards (16)) / 2
  const cardWidth = (windowWidth - 48) / 2;

  useEffect(() => {
    const loadHomeData = async () => {
      // BANNERS
      const loadBanners = async () => {
        try {
          setLoadingBanners(true);
          const data = await HomeService.getBanners();
          setBanners(data);
        } catch (err: any) {
          Toast.show({
            type: "error",
            text1: "Banner Error",
            text2: err?.message || "Failed to load banners",
          });
        } finally {
          setLoadingBanners(false);
        }
      };

      // CATEGORIES
      const loadCategories = async () => {
        try {
          setLoadingCategories(true);
          const data = await HomeService.getCategories();
          setCategories(data);
        } catch (err: any) {
          Toast.show({
            type: "error",
            text1: "Category Error",
            text2: err?.message || "Failed to load categories",
          });
        } finally {
          setLoadingCategories(false);
        }
      };

      // PRODUCTS
      const loadProducts = async () => {
        try {
          setLoadingProducts(true);
          const data = await HomeService.getNewArrivalsProducts();
          setProducts(data);
        } catch (err: any) {
          Toast.show({
            type: "error",
            text1: "Products Error",
            text2: err?.message || "Failed to load products",
          });
        } finally {
          setLoadingProducts(false);
        }
      };

      // call all independently
      loadBanners();
      loadCategories();
      loadProducts();
    };

    loadHomeData();
  }, []);

  return (
    <View className="flex-1">
      <AppBar title="Wafi Ecommerce" />

      <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
        {loadingBanners ? (
          <BannerSkeleton />
        ) : (
          <Carousel data={banners}></Carousel>
        )}

        {loadingCategories ? (
          <CategoriesSkeleton />
        ) : (
          <View className="mt-sm">
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                paddingHorizontal: Sizes.md,
                alignItems: "center",
                gap: 10,
              }}
            >
              {categories.map((category) => (
                <LiquidGlass
                  key={category.id}
                  borderRadius={Sizes.radiusFull}
                  onPress={() => {}}
                  style={{ height: 50 }} // ← was 44
                  pressable
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      paddingHorizontal: 18, // ← was 14
                      paddingVertical: 14, // ← was 10
                      gap: 10, // ← was 8
                    }}
                  >
                    {/* Icon badge */}
                    <View
                      style={{
                        width: 30, // ← was 26
                        height: 30, // ← was 26
                        borderRadius: 17, // ← was 13
                        overflow: "hidden",
                        borderWidth: 1,
                        borderColor: "rgba(255,255,255,0.6)",
                      }}
                    >
                      <Image
                        source={{ uri: category.image_url }}
                        style={{ width: 30, height: 30, resizeMode: "cover" }}
                      />
                    </View>

                    {/* Label */}
                    <Text
                      style={{
                        fontSize: 14, // ← was 13
                        fontWeight: "600",
                        color: Colors.textPrimary,
                        letterSpacing: 0.2,
                      }}
                    >
                      {category.name}
                    </Text>
                  </View>
                </LiquidGlass>
              ))}
            </ScrollView>
          </View>
        )}

        <View>
          <Text className="text-xl text-text-primary mb-md mt-lg border-l-2 border-primary pl-3">
            New Arrivals
          </Text>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 10 }}
        >
          {products.map((item, index) => (
            <View
              key={item.id}
              style={{ width: cardWidth }}
              className={index === products.length - 1 ? "" : "mr-md"}
            >
              <LiquidGlass
                className="overflow-hidden"
                borderRadius={Sizes.radiusMd}
                pressable={false}
              >
                <View className="relative">
                  <View className="h-[160px] w-full bg-primary/5 items-center justify-center">
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
                        color={Colors.primary + "40"}
                      />
                    </View>
                  </View>

                  {item.discount_tag && (
                    <View className="absolute top-2 left-2 bg-secondary px-2 py-1 rounded-full">
                      <Text className="text-[10px] font-bold text-white">
                        {item.discount_tag}
                      </Text>
                    </View>
                  )}
                </View>

                <View className="p-sm">
                  <Text
                    className="text-sm font-bold text-text-primary"
                    numberOfLines={1}
                  >
                    {item.title}
                  </Text>

                  <View className="flex-row items-center justify-between mt-xs">
                    <View className="flex-row gap-1 items-center">
                      <Text className="text-md font-bold text-primary">
                        ৳{item.discount_price}
                      </Text>
                      {item.original_price > item.discount_price && (
                        <Text className="text-[11px] text-primary/80 line-through">
                          ৳{item.original_price}
                        </Text>
                      )}
                    </View>
                  </View>

                  <TouchableOpacity
                    className="mt-sm bg-primary py-2 rounded-lg items-center justify-center shadow-sm"
                    onPress={() => {}}
                    activeOpacity={1}
                  >
                    <Text className="text-white text-xs font-bold">
                      Add to Cart
                    </Text>
                  </TouchableOpacity>
                </View>
              </LiquidGlass>
            </View>
          ))}
        </ScrollView>

        {/* Padding for bottom nav */}
        <View className="h-[100px]" />
      </ScrollView>
    </View>
  );
};
