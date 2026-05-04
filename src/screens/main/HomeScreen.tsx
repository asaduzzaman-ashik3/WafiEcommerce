import { AppBar } from "@/components/shared/AppBar";
import { Carousel } from "@/components/shared/Carousel";
import { BannerSkeleton } from "@/components/ui/skeleton/BannerSkeleton";
import { CategoriesSkeleton } from "@/components/ui/skeleton/Categories_skeleton";
import { LiquidGlass } from "@/components/shared/LiquidGlass";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/colors";
import { Sizes } from "@/constants/sizes";
import { HomeService } from "@/services/home_service";
import { Banner } from "@/types/banner_types";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { BookCategory } from "@/types/book_category";

export const HomeScreen = () => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loadingBanners, setLoadingBanners] = useState(true);
  const [categories, setCategories] = useState<BookCategory[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  const products = [
    {
      id: "1",
      product_id: "NH001",
      category_id: "ORGANIC_FOOD",
      title:
        "Organic Honey 500g Organic Honey 500gOrganic Honey 500gOrganic Honey 500gOrganic Honey 500g",
      brand_name: "PureBee",
      description: "Raw organic honey rich in antioxidants and natural energy.",
      image_urls: [
        "https://backoffice.ghorerbazar.com/banner/o1uH11775363016-light.jpg",
      ],
      original_price: 450,
      discount_price: 399,
      discount_tag: "11% OFF",
      label_tag: "Best Seller",
    },
    {
      id: "2",
      product_id: "NH002",
      category_id: "HERBAL",
      title: "Aloe Vera Juice 1L",
      brand_name: "NatureLife",
      description: "Detoxifying aloe vera juice for digestion and skin health.",
      image_urls: [
        "https://backoffice.ghorerbazar.com/banner/sCUkg1774768074-dark.png",
        "https://images.unsplash.com/photo-1615486364462-ef6363f3c2b0?2",
      ],
      original_price: 600,
      discount_price: 520,
      discount_tag: "13% OFF",
      label_tag: "Trending",
    },
    {
      id: "3",
      product_id: "NH003",
      category_id: "ORGANIC_FOOD",
      title: "Chia Seeds 250g",
      brand_name: "Organic Valley",
      description: "High fiber superfood rich in omega-3 and protein.",
      image_urls: [
        "https://backoffice.ghorerbazar.com/banner/wvLKI1771837751.jpeg",
      ],
      original_price: 350,
      discount_price: 299,
      discount_tag: "15% OFF",
      label_tag: "Superfood",
    },
    {
      id: "4",
      product_id: "NH004",
      category_id: "BEAUTY",
      title: "Organic Coconut Oil 500ml",
      brand_name: "CocoPure",
      description: "Cold-pressed coconut oil for skin, hair and cooking.",
      image_urls: [
        "https://images.unsplash.com/photo-1600180758890-6b94519a8ba6",
        "https://images.unsplash.com/photo-1600180758890-6b94519a8ba6?2",
      ],
      original_price: 500,
      discount_price: 450,
      discount_tag: "10% OFF",
      label_tag: "Natural Care",
    },
    {
      id: "5",
      product_id: "NH005",
      category_id: "HERBAL",
      title: "Green Tea Detox Pack",
      brand_name: "ZenHerb",
      description: "Refreshing green tea for weight loss and detox.",
      image_urls: ["https://images.unsplash.com/photo-1515823064-d6e0c04616a7"],
      original_price: 300,
      discount_price: 250,
      discount_tag: "17% OFF",
      label_tag: "Healthy Choice",
    },
    {
      id: "6",
      product_id: "NH006",
      category_id: "SUPPLEMENT",
      title: "Spirulina Tablets 120pcs",
      brand_name: "BioFit",
      description: "Plant-based protein supplement for immunity boost.",
      image_urls: [
        "https://images.unsplash.com/photo-1622484212850-eb596d769edc",
      ],
      original_price: 800,
      discount_price: 699,
      discount_tag: "13% OFF",
      label_tag: "Immunity Boost",
    },
    {
      id: "7",
      product_id: "NH007",
      category_id: "ORGANIC_FOOD",
      title: "Brown Rice 5kg",
      brand_name: "EcoGrain",
      description: "Whole grain brown rice for healthy diet lifestyle.",
      image_urls: [
        "https://images.unsplash.com/photo-1607305387299-a3d9611cd469",
      ],
      original_price: 700,
      discount_price: 620,
      discount_tag: "11% OFF",
      label_tag: "Organic",
    },
    {
      id: "8",
      product_id: "NH008",
      category_id: "BEAUTY",
      title: "Herbal Face Wash Gel",
      brand_name: "HerbalGlow",
      description: "Chemical-free face wash for glowing natural skin.",
      image_urls: [
        "https://images.unsplash.com/photo-1612810436541-336d8f1d7a9c",
      ],
      original_price: 350,
      discount_price: 299,
      discount_tag: "15% OFF",
      label_tag: "Skin Care",
    },
  ];

  useEffect(() => {
    const loadHomeData = async () => {
      try {
        setLoadingBanners(true);
        setLoadingCategories(true);

        const [banners, categories] = await Promise.all([
          HomeService.getBanners(),
          HomeService.getCategories(),
        ]);

        setBanners(banners);
        setCategories(categories);
      } catch (err) {
        console.log(err);
      } finally {
        setLoadingBanners(false);
        setLoadingCategories(false);
      }
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

        <Text className="text-[24px] font-[800] text-text-primary mb-md mt-lg">
          Recent Items
        </Text>
        <View className="flex-row flex-wrap justify-between">
          {products.map((item) => (
            <View key={item.id} className="w-[48%] mb-md">
              <LiquidGlass
                className="overflow-hidden"
                borderRadius={Sizes.radiusMd}
                pressable={false}
              >
                <View className="relative">
                  <View className="h-[160px] w-full bg-primary/5 items-center justify-center">
                    <Image
                      source={{ uri: item.image_urls[0] }}
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

                  {item.label_tag && (
                    <View className="absolute top-2 right-2 bg-primary/80 px-2 py-1 rounded-full">
                      <Text className="text-[10px] font-bold text-white">
                        {item.label_tag}
                      </Text>
                    </View>
                  )}
                </View>

                <View className="p-sm">
                  <Text
                    className="text-sm font-bold text-text-primary "
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
        </View>

        {/* Padding for bottom nav */}
        <View className="h-[100px]" />
      </ScrollView>
    </View>
  );
};
