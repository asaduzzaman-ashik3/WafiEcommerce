import { AppButton } from "@/components/shared/AppButton";
import { AppTextField } from "@/components/shared/AppTextField";
import { LiquidGlass } from "@/components/shared/LiquidGlass";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useTheme } from "@/context/ThemeContext";
import { Link, router } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { signInWithGoogle, supabase } from "../../lib/supabase";

export default function LoginScreen() {
  const { colors } = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [authError, setAuthError] = useState("");

  const validateEmail = (text: string) => {
    if (!text) {
      setEmailError("Please enter some text");
      return false;
    }
    const emailValid =
      /^[a-zA-Z0-9.a-zA-Z0-9.!#$%&'*+-/=?^_`{|}~]+@[a-zA-Z0-9]+\.[a-zA-Z]+/.test(
        text,
      );
    if (!emailValid) {
      setEmailError("Please enter a valid email");
      return false;
    }
    setEmailError("");
    return true;
  };

  const validatePassword = (text: string) => {
    if (!text) {
      setPasswordError("Please enter some text");
      return false;
    }
    if (text.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      return false;
    }
    setPasswordError("");
    return true;
  };

  async function signInWithEmail() {
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    if (!isEmailValid || !isPasswordValid) return;

    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      setAuthError(error.message);
    } else {
      setAuthError("");
      setEmail("");
      setPassword("");
      router.replace("/(tabs)");
    }
    setLoading(false);
  }

  async function handleGoogleSignIn() {
    setLoading(true);
    try {
      const { data, error } = await signInWithGoogle();
      if (error) {
        setAuthError(error.message);
      } else if (data?.user) {
        router.replace("/(tabs)");
      }
    } catch (err: any) {
      setAuthError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View className="flex-1">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          className="flex-1"
          contentContainerStyle={{
            paddingHorizontal: 24,
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100%",
          }}
        >
          <LiquidGlass
            borderRadius={24}
            pressable={false}
            className="w-full p-8"
          >
            <View className="items-center mb-10">
              <Text
                className="text-xl font-bold text-center"
                style={{ color: colors.textPrimary, marginBottom: 20 }}
              >
                Welcome back
              </Text>
            </View>

            <View className="gap-1">
              <AppTextField
                label="Email"
                placeholder="Enter your email"
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  if (emailError) validateEmail(text);
                }}
                error={emailError}
                autoCapitalize="none"
                keyboardType="email-address"
              />

              <View>
                <AppTextField
                  label="Password"
                  placeholder="Enter your password"
                  value={password}
                  onChangeText={(text) => {
                    setPassword(text);
                    if (passwordError) validatePassword(text);
                  }}
                  error={passwordError}
                  secureTextEntry={!isPasswordVisible}
                />
                <TouchableOpacity
                  onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                  className="absolute right-4 top-[42px]"
                >
                  <IconSymbol
                    name={isPasswordVisible ? "eye.slash.fill" : "eye.fill"}
                    size={20}
                    color={colors.textMuted}
                  />
                </TouchableOpacity>
              </View>

              {authError ? (
                <Text className="text-[11px] text-red-600 ml-1 mb-2">
                  {authError}
                </Text>
              ) : null}

              <TouchableOpacity
                onPress={() => setRememberMe(!rememberMe)}
                className="flex-row items-center gap-2 mb-2"
              >
                <View
                  className="w-5 h-5 rounded border items-center justify-center"
                  style={{
                    borderColor: rememberMe ? colors.primary : colors.textMuted,
                    backgroundColor: rememberMe
                      ? colors.primary
                      : "transparent",
                  }}
                ></View>
              </TouchableOpacity>

              <AppButton
                title="Sign in"
                variant="solid"
                onPress={signInWithEmail}
                loading={loading}
                style={{ height: 50, marginBottom: 15 }}
              />

              {/* <View className="flex-row items-center gap-4 mb-6">
                <View
                  className="flex-1 h-[1px]"
                  style={{ backgroundColor: colors.border + "40" }}
                />
                <Text
                  className="text-xs font-medium"
                  style={{ color: colors.textMuted }}
                >
                  OR CONTINUE WITH
                </Text>
                <View
                  className="flex-1 h-[1px]"
                  style={{ backgroundColor: colors.border + "40" }}
                />
              </View>

              <AppButton
                title="Google"
                variant="solid"
                onPress={handleGoogleSignIn}
                loading={loading}
                icon={
                  <IconSymbol name="globe" size={20} color={colors.primary} />
                }
                style={{ height: 50, marginBottom: 15 }}
              /> */}

              <View className="flex-row justify-center items-center mt-4 gap-1">
                <Text style={{ color: colors.textSecondary }}>
                  Don't have an account?
                </Text>
                <Link href="/(auth)/register" asChild>
                  <TouchableOpacity>
                    <Text
                      style={{ color: colors.primary }}
                      className="font-bold"
                    >
                      Register
                    </Text>
                  </TouchableOpacity>
                </Link>
              </View>
            </View>
          </LiquidGlass>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
