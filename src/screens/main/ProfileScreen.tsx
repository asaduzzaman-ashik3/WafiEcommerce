import { AppBar } from "@/components/shared/AppBar";
import { AppButton } from "@/components/shared/AppButton";
import { LiquidGlass } from "@/components/shared/LiquidGlass";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useTheme } from "@/context/ThemeContext";
import { useAuthContext } from "@/hooks/use-auth-context";
import { router } from "expo-router";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { supabase } from "../../../lib/supabase";

// Move components outside for stability
const Section = ({
  title,
  children,
  colors,
}: {
  title: string;
  children: React.ReactNode;
  colors: any;
}) => (
  <View className="mb-6">
    <LiquidGlass borderRadius={24} pressable={false}>
      <View className="p-1">{children}</View>
    </LiquidGlass>
  </View>
);

const SettingTile = ({
  icon,
  title,
  subtitle,
  onPress,
  trailing,
  colors,
}: {
  icon: any;
  title: string;
  subtitle?: string;
  onPress?: () => void;
  trailing?: React.ReactNode;
  colors: any;
}) => (
  <TouchableOpacity
    onPress={onPress}
    className="flex-row items-center p-4 rounded-2xl"
    activeOpacity={0.7}
  >
    <View
      className="w-10 h-10 rounded-xl items-center justify-center mr-4"
      style={{ backgroundColor: colors.primary + "15" }}
    >
      <IconSymbol name={icon} size={20} color={colors.primary} />
    </View>
    <View className="flex-1">
      <Text
        className="text-base font-semibold"
        style={{ color: colors.textPrimary }}
      >
        {title}
      </Text>
      {subtitle && (
        <Text className="text-xs" style={{ color: colors.textSecondary }}>
          {subtitle}
        </Text>
      )}
    </View>
    {trailing || (
      <IconSymbol name="chevron.right" size={18} color={colors.textMuted} />
    )}
  </TouchableOpacity>
);

export const ProfileScreen = () => {
  const { themeMode, setThemeMode, colors } = useTheme();
  const { isLoggedIn, profile } = useAuthContext();

  const themeOptions: {
    label: string;
    value: "light" | "dark" | "system";
    icon: any;
  }[] = [
    { label: "Light", value: "light", icon: "sun.max.fill" },
    { label: "Dark", value: "dark", icon: "moon.fill" },
    { label: "System", value: "system", icon: "desktopcomputer" },
  ];

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const stats = [
    { label: "Orders", value: isLoggedIn ? "12" : "0", icon: "bag.fill" },
    { label: "Wishlist", value: isLoggedIn ? "24" : "0", icon: "heart.fill" },
    { label: "Coupons", value: isLoggedIn ? "3" : "0", icon: "tag.fill" },
  ];

  return (
    <View className="flex-1">
      <AppBar title="Profile Settings" />
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 120,
          paddingBottom: 120,
        }}
      >
        {/* Profile Header Card */}
        <LiquidGlass borderRadius={28} pressable={false} className="mb-8">
          <View className="p-6 items-center">
            <View className="relative mb-4">
              <View
                className="w-24 h-24 rounded-full items-center justify-center border-4"
                style={{
                  backgroundColor: colors.primary + "20",
                  borderColor: colors.surface,
                }}
              >
                <IconSymbol
                  name={
                    isLoggedIn
                      ? "person.fill"
                      : "person.crop.circle.badge.questionmark"
                  }
                  size={52}
                  color={isLoggedIn ? colors.primary : colors.textMuted}
                />
              </View>
              {isLoggedIn && (
                <TouchableOpacity
                  className="absolute bottom-0 right-0 w-8 h-8 rounded-full items-center justify-center border-2"
                  style={{
                    backgroundColor: colors.primary,
                    borderColor: colors.surface,
                  }}
                >
                  <IconSymbol name="camera.fill" size={14} color="white" />
                </TouchableOpacity>
              )}
            </View>

            <Text
              className="text-2xl font-bold"
              style={{ color: colors.textPrimary }}
            >
              {isLoggedIn ? profile?.name || "Wafi User" : "Guest User"}
            </Text>
            <Text
              className="text-sm mt-1"
              style={{ color: colors.textSecondary }}
            >
              {isLoggedIn
                ? profile?.email || ""
                : "Sign in to access all features"}
            </Text>

            {!isLoggedIn && (
              <AppButton
                title="Sign In"
                onPress={() => router.push("/(auth)/login")}
                style={{ marginTop: 20, width: 140, height: 45 }}
                variant="solid"
              />
            )}
          </View>
        </LiquidGlass>

        {/* Personal Information & Preferences */}
        <Section title="" colors={colors}>
          <SettingTile
            icon="person.crop.circle"
            title="Edit Profile"
            subtitle="Name, bio, photo"
            onPress={() => {}}
            colors={colors}
          />
          <SettingTile
            icon="envelope"
            title="Email Address"
            subtitle={
              isLoggedIn ? profile?.email || "Not set" : "Sign in to view email"
            }
            onPress={() => {}}
            colors={colors}
          />
          <SettingTile
            icon="phone"
            title="Phone Number"
            subtitle="+1 234 567 8900"
            onPress={() => {}}
            colors={colors}
          />
          <SettingTile
            icon="gearshape.fill"
            title="Account Security"
            subtitle="Password, 2FA, Sessions"
            onPress={() => {}}
            colors={colors}
          />

          <View
            className="p-4 pt-2 border-t"
            style={{ borderTopColor: colors.border + "40" }}
          >
            <View className="flex-row items-center mb-4"></View>
            <View className="flex-row gap-2">
              {themeOptions.map((option) => {
                const active = themeMode === option.value;
                return (
                  <TouchableOpacity
                    key={option.value}
                    onPress={() => setThemeMode(option.value)}
                    className="flex-1 items-center justify-center py-3 rounded-2xl border"
                    style={{
                      backgroundColor: active
                        ? colors.primary + "15"
                        : "transparent",
                      borderColor: active ? colors.primary : colors.border,
                    }}
                  >
                    <IconSymbol
                      name={option.icon}
                      size={18}
                      color={active ? colors.primary : colors.textMuted}
                    />
                    <Text
                      className="text-[10px] mt-1 font-bold"
                      style={{
                        color: active ? colors.primary : colors.textMuted,
                      }}
                    >
                      {option.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </Section>

        {isLoggedIn && (
          <TouchableOpacity
            onPress={handleLogout}
            className="mt-4 flex-row items-center justify-center p-4 rounded-2xl border"
            style={{
              borderColor: colors.error + "40",
              backgroundColor: colors.error + "05",
            }}
          >
            <IconSymbol
              name="arrow.left.square.fill"
              size={20}
              color={colors.error}
            />
            <Text className="ml-2 font-bold" style={{ color: colors.error }}>
              Log Out
            </Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  );
};
