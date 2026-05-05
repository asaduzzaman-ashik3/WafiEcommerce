import { AppBar } from "@/components/shared/AppBar";
import { Carousel } from "@/components/shared/Carousel";
import { LiquidGlass } from "@/components/shared/LiquidGlass";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { BannerSkeleton } from "@/components/ui/skeleton/BannerSkeleton";
import { CategoriesSkeleton } from "@/components/ui/skeleton/Categories_skeleton";
import { ProductCard } from "@/components/shared/cards/product_card";
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
  const [bestsellerProducts, setBestsellerProducts] = useState<Product[]>([]);
  const [topRatedProducts, setTopRatedProducts] = useState<Product[]>([]);
  const [discountProducts, setDiscountProducts] = useState<Product[]>([]);
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
          const [newArrivals, bestsellers, topRated, discounts] = await Promise.all([
            HomeService.getNewArrivalsProducts(),
            HomeService.getBestsellerProducts(),
            HomeService.getTopRatedProducts(),
            HomeService.getDiscountedProducts(),
          ]);
          setProducts(newArrivals);
          setBestsellerProducts(bestsellers);
          setTopRatedProducts(topRated);
          setDiscountProducts(discounts);
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

        {/* New Arrivals Section */}
        <View>
          <Text
            className="text-xl mb-md mt-lg border-l-2 pl-3 font-bold"
            style={{
              color: colors.textPrimary,
              borderLeftColor: colors.primary,
            }}
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
            <ProductCard
              key={item.id}
              item={item}
              cardWidth={cardWidth}
              isLast={index === products.length - 1}
            />
          ))}
        </ScrollView>

        {/* Bestseller Section */}
        {bestsellerProducts.length > 0 && (
          <>
            <View>
              <Text
                className="text-xl mb-md mt-lg border-l-2 pl-3 font-bold"
                style={{
                  color: colors.textPrimary,
                  borderLeftColor: colors.primary,
                }}
              >
                Bestseller
              </Text>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 10 }}
            >
              {bestsellerProducts.map((item, index) => (
                <ProductCard
                  key={item.id}
                  item={item}
                  cardWidth={cardWidth}
                  isLast={index === bestsellerProducts.length - 1}
                />
              ))}
            </ScrollView>
          </>
        )}

        {/* Top Rated Section */}
        {topRatedProducts.length > 0 && (
          <>
            <View>
              <Text
                className="text-xl mb-md mt-lg border-l-2 pl-3 font-bold"
                style={{
                  color: colors.textPrimary,
                  borderLeftColor: colors.primary,
                }}
              >
                Top Rated
              </Text>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 10 }}
            >
              {topRatedProducts.map((item, index) => (
                <ProductCard
                  key={item.id}
                  item={item}
                  cardWidth={cardWidth}
                  isLast={index === topRatedProducts.length - 1}
                />
              ))}
            </ScrollView>
          </>
        )}

        {/* Discounts Section */}
        {discountProducts.length > 0 && (
          <>
            <View>
              <Text
                className="text-xl mb-md mt-lg border-l-2 pl-3 font-bold"
                style={{
                  color: colors.textPrimary,
                  borderLeftColor: colors.primary,
                }}
              >
                Discounts
              </Text>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 10 }}
            >
              {discountProducts.map((item, index) => (
                <ProductCard
                  key={item.id}
                  item={item}
                  cardWidth={cardWidth}
                  isLast={index === discountProducts.length - 1}
                />
              ))}
            </ScrollView>
          </>
        )}

        <View className="h-[100px]" />
      </ScrollView>
    </View>
  );
};
