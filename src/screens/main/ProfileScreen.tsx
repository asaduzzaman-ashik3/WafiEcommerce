import { AppBar } from "@/components/shared/AppBar";
import { LiquidGlass } from "@/components/shared/LiquidGlass";
import { useTheme } from "@/context/ThemeContext";
import React from "react";
import { ScrollView, Text, View, TouchableOpacity } from "react-native";
import { IconSymbol } from "@/components/ui/icon-symbol";

export const ProfileScreen = () => {
  const { themeMode, setThemeMode, colors, isDark } = useTheme();

  const themeOptions: { label: string; value: 'light' | 'dark' | 'system'; icon: any }[] = [
    { label: "Light", value: "light", icon: "sun.max.fill" },
    { label: "Dark", value: "dark", icon: "moon.fill" },
    { label: "System", value: "system", icon: "desktopcomputer" },
  ];

  return (
    <View className="flex-1">
      <AppBar title="Profile" />
      <ScrollView className="flex-1 px-md py-lg">
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
                    backgroundColor: themeMode === option.value ? colors.primary + '15' : 'transparent',
                  }}
                >
                  <View className="flex-row items-center gap-md">
                    <IconSymbol 
                      name={option.icon} 
                      size={20} 
                      color={themeMode === option.value ? colors.primary : colors.textSecondary} 
                    />
                    <Text 
                      className="font-medium" 
                      style={{ 
                        color: themeMode === option.value ? colors.primary : colors.textPrimary 
                      }}
                    >
                      {option.label}
                    </Text>
                  </View>
                  {themeMode === option.value && (
                    <IconSymbol name="checkmark.circle.fill" size={20} color={colors.primary} />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </LiquidGlass>
        </View>

        {/* User Info Placeholder */}
        <View className="items-center py-xl">
          <View 
            className="w-24 h-24 rounded-full items-center justify-center mb-md"
            style={{ backgroundColor: colors.primary + '20' }}
          >
            <IconSymbol name="person.fill" size={48} color={colors.primary} />
          </View>
          <Text 
            className="text-xl font-bold" 
            style={{ color: colors.textPrimary }}
          >
            Wafi User
          </Text>
          <Text 
            className="text-base" 
            style={{ color: colors.textSecondary }}
          >
            wafi.user@example.com
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};
