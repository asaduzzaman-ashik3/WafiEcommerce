import { AppBar } from "@/components/shared/AppBar";
import { Carousel } from "@/components/shared/Carousel";
import { LiquidGlass } from "@/components/shared/LiquidGlass";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { BannerSkeleton } from "@/components/ui/skeleton/BannerSkeleton";
import { CategoriesSkeleton } from "@/components/ui/skeleton/Categories_skeleton";
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
import { useTheme } from "@/context/ThemeContext";

export const HomeScreen = () => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loadingBanners, setLoadingBanners] = useState(true);
  const [categories, setCategories] = useState<BookCategory[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const { colors } = useTheme();

  const { width: windowWidth } = useWindowDimensions();
  const cardWidth = (windowWidth - 48) / 2;

  useEffect(() => {
    const loadHomeData = async () => {
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
                  style={{ height: 50 }}
                  pressable
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      paddingHorizontal: 18,
                      paddingVertical: 14,
                      gap: 10,
                    }}
                  >
                    <View
                      style={{
                        width: 30,
                        height: 30,
                        borderRadius: 17,
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

                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: "600",
                        color: colors.textPrimary,
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
          <Text 
            className="text-xl mb-md mt-lg border-l-2 pl-3 font-bold"
            style={{ color: colors.textPrimary, borderLeftColor: colors.primary }}
          >
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
                  <View className="h-[160px] w-full items-center justify-center" style={{ backgroundColor: colors.primary + '05' }}>
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
                      <Text className="text-md font-bold" style={{ color: colors.primary }}>
                        ৳{item.discount_price}
                      </Text>
                      {item.original_price > item.discount_price && (
                        <Text 
                          className="text-[11px] line-through"
                          style={{ color: colors.primary + '80' }}
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
          ))}
        </ScrollView>

        <View className="h-[100px]" />
      </ScrollView>
    </View>
  );
};
