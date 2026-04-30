import React from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { AppBar } from "@/src/shared/components/AppBar";
import { AppButton } from "@/src/shared/components/AppButton";
import { LiquidGlass } from "@/src/shared/components/LiquidGlass";
import { Colors } from "@/src/core/constants/colors";
import { Sizes } from "@/src/core/constants/sizes";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <AppBar title="Wafi Ecommerce" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <LiquidGlass style={styles.featuredCard} borderRadius={Sizes.radiusLg}>
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>New Collection</Text>
            <Text style={styles.cardSubtitle}>
              Explore the latest trends in fashion and lifestyle.
            </Text>
            <AppButton
              title="Shop Now"
              onPress={() => {}}
              style={styles.cardButton}
            />
          </View>
        </LiquidGlass>

        <View style={styles.formSection}>
          <View style={styles.buttonRow}>
            <AppButton
              title="Categories"
              onPress={() => {}}
              variant="outline"
              style={styles.flexButton}
            />
            <View style={{ width: Sizes.md }} />
            <AppButton
              title="Deals"
              onPress={() => {}}
              style={styles.flexButton}
            />
          </View>
        </View>

        <Text style={styles.sectionTitle}>Recent Items</Text>
        <View style={styles.grid}>
          {[1, 2, 3, 4].map((item) => (
            <LiquidGlass
              key={item}
              style={styles.gridItem}
              borderRadius={Sizes.radiusMd}
            >
              <View style={styles.itemImagePlaceholder} />
              <View style={styles.itemInfo}>
                <Text style={styles.itemName}>Premium Item {item}</Text>
                <Text style={styles.itemPrice}>৳2,500</Text>
              </View>
            </LiquidGlass>
          ))}
        </View>

        {/* Padding for bottom nav */}
        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: Sizes.md,
  },
  sectionTitle: {
    fontSize: Sizes.fontXl,
    fontWeight: "800",
    color: Colors.textPrimary,
    marginBottom: Sizes.md,
    marginTop: Sizes.lg,
  },
  featuredCard: {
    height: 200,
    marginBottom: Sizes.lg,
  },
  cardContent: {
    flex: 1,
    padding: Sizes.lg,
    justifyContent: "center",
  },
  cardTitle: {
    fontSize: Sizes.fontXxl,
    fontWeight: "900",
    color: Colors.primary,
  },
  cardSubtitle: {
    fontSize: Sizes.fontMd,
    color: Colors.textSecondary,
    marginTop: Sizes.xs,
    marginBottom: Sizes.lg,
  },
  cardButton: {
    alignSelf: "flex-start",
    height: 48,
  },
  formSection: {
    marginTop: Sizes.sm,
  },
  buttonRow: {
    flexDirection: "row",
  },
  flexButton: {
    flex: 1,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  gridItem: {
    width: "48%",
    height: 220,
    marginBottom: Sizes.md,
  },
  itemImagePlaceholder: {
    height: 140,
    backgroundColor: "rgba(255,255,255,0.3)",
    borderTopLeftRadius: Sizes.radiusMd,
    borderTopRightRadius: Sizes.radiusMd,
  },
  itemInfo: {
    padding: Sizes.sm,
  },
  itemName: {
    fontSize: Sizes.fontSm,
    fontWeight: "700",
    color: Colors.textPrimary,
  },
  itemPrice: {
    fontSize: Sizes.fontBase,
    fontWeight: "800",
    color: Colors.secondary,
    marginTop: Sizes.xs,
  },
});
