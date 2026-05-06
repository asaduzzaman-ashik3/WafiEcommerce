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

export const ProfileScreen = () => {
  const { themeMode, setThemeMode, colors } = useTheme();
  const { isLoggedIn, profile, isLoading } = useAuthContext();

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

  return (
    <View className="flex-1">
      <AppBar title="Profile" />
      <ScrollView
        className="flex-1 px-md"
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingTop: 120,
          paddingBottom: 20,
        }}
      >
        {isLoggedIn ? (
          <View className="items-center py-xl mb-md">
            <View
              className="w-24 h-24 rounded-full items-center justify-center mb-md"
              style={{ backgroundColor: colors.primary + "20" }}
            >
              <IconSymbol name="person.fill" size={48} color={colors.primary} />
            </View>
            <Text
              className="text-xl font-bold"
              style={{ color: colors.textPrimary }}
            >
              {profile?.name || "Wafi User"}
            </Text>
            <Text
              className="text-base mb-md"
              style={{ color: colors.textSecondary }}
            >
              {profile?.email || ""}
            </Text>

            <AppButton
              title="Logout"
              variant="outline"
              onPress={handleLogout}
              style={{ width: "100%", marginTop: 8 }}
            />
          </View>
        ) : (
          <View className="py-xl mb-md gap-md">
            <View className="items-center mb-md">
              <View
                className="w-24 h-24 rounded-full items-center justify-center mb-md"
                style={{ backgroundColor: colors.textMuted + "20" }}
              >
                <IconSymbol
                  name="person.crop.circle.badge.questionmark"
                  size={48}
                  color={colors.textSecondary}
                />
              </View>
              <Text
                className="text-lg font-medium text-center"
                style={{ color: colors.textSecondary }}
              >
                Sign in to sync your profile and orders across devices
              </Text>
            </View>
            <AppButton
              title="Login"
              onPress={() => router.push("/(auth)/login")}
            />
          </View>
        )}

        <View className="mb-xl">
          <Text
            className="text-lg font-bold mb-md"
            style={{ color: colors.textPrimary }}
          >
            Appearance
          </Text>

          <LiquidGlass borderRadius={20} pressable={false}>
            <View className="p-md gap-md">
              {themeOptions.map((option) => (
                <TouchableOpacity
                  key={option.value}
                  onPress={() => setThemeMode(option.value)}
                  className="flex-row items-center justify-between p-sm rounded-xl"
                  style={{
                    backgroundColor:
                      themeMode === option.value
                        ? colors.primary + "25"
                        : "transparent",
                  }}
                >
                  <View className="flex-row items-center gap-md">
                    <IconSymbol
                      name={option.icon}
                      size={20}
                      color={
                        themeMode === option.value
                          ? colors.primary
                          : colors.textSecondary
                      }
                    />
                    <Text
                      className="font-medium"
                      style={{
                        color:
                          themeMode === option.value
                            ? colors.primary
                            : colors.textPrimary,
                      }}
                    >
                      {option.label}
                    </Text>
                  </View>
                  {themeMode === option.value && (
                    <IconSymbol
                      name="checkmark.circle.fill"
                      size={20}
                      color={colors.primary}
                    />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </LiquidGlass>
        </View>
      </ScrollView>
    </View>
  );
};
