import { MainLayout } from "@/layout/MainLayout";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import "react-native-gesture-handler";
import "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "../src/global.css";

import { useColorScheme } from "@/hooks/use-color-scheme";

export const unstable_settings = {
  anchor: "(tabs)",
};

import { AppDrawer } from "@/components/shared/AppDrawer";
import { Drawer } from "expo-router/drawer";
import { ThemeProvider as CustomThemeProvider } from "@/context/ThemeContext";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <SafeAreaProvider>
      <CustomThemeProvider>
        <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
          <MainLayout>
            <Drawer
              drawerContent={(props) => <AppDrawer {...props} />}
              screenOptions={{
                headerShown: false,
                drawerType: "front",
                overlayColor: "rgba(58, 107, 42, 0.2)",
                drawerStyle: {
                  backgroundColor: "#ffffff",
                  width: "80%",
                },
                sceneStyle: { backgroundColor: "transparent" },
              }}
            >
              <Drawer.Screen name="(tabs)" options={{ drawerLabel: "Home" }} />
              <Drawer.Screen
                name="modal"
                options={{
                  drawerLabel: "Modal",
                  drawerItemStyle: { display: "none" },
                }}
              />
            </Drawer>
          </MainLayout>
          <StatusBar style="auto" />
        </ThemeProvider>
      </CustomThemeProvider>
    </SafeAreaProvider>
  );
}
