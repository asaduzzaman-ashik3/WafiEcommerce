import { Colors } from "@/src/core/constants/colors";
import { Sizes, window } from "@/src/core/constants/sizes";
import * as React from "react";
import { Image, View } from "react-native";
import ReanimatedCarousel from "react-native-reanimated-carousel";

const data = [
  { image: "https://backoffice.ghorerbazar.com/banner/o1uH11775363016-light.jpg" },
  { image: "https://backoffice.ghorerbazar.com/banner/sCUkg1774768074-dark.png" },
  { image: "https://backoffice.ghorerbazar.com/banner/wvLKI1771837751.jpeg" },
];

export function Carousel() {
  return (
    // Assuming mb-lg is a custom spacing defined in your tailwind config
    <View className=" items-center">
      <ReanimatedCarousel
        loop
        width={window.width}
        height={200}
        autoPlay={true}
        autoPlayInterval={2000}
        data={data}
        scrollAnimationDuration={1000}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 60,
        }}
        renderItem={({ item }) => (
          <View className="h-full px-2"> 
            <Image
              source={{ uri: item.image }}
              // Use rounded-3xl (approx 24px) or rounded-[32px] for custom size
              className="w-full h-full rounded-xl"
              resizeMode="cover"
            />
          </View>
        )}
      />
    </View>
  );
}

export default Carousel;