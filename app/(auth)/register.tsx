import { AppButton } from "@/components/shared/AppButton";
import { AppTextField } from "@/components/shared/AppTextField";
import { LiquidGlass } from "@/components/shared/LiquidGlass";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useTheme } from "@/context/ThemeContext";
import { Link, router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { supabase } from "../../lib/supabase";

export default function RegisterScreen() {
  const { colors } = useTheme();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [authError, setAuthError] = useState("");

  const validateEmail = (text: string) => {
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
    if (text.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const validateName = (text: string) => {
    if (!text) {
      setNameError("Please enter your name");
      return false;
    }
    setNameError("");
    return true;
  };

  async function signUpWithEmail() {
    const isNameValid = validateName(name);
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    if (!isNameValid || !isEmailValid || !isPasswordValid) return;

    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          full_name: name, // optional metadata
        },
      },
    });

    if (error) {
      setAuthError(error.message);
    } else {
      setAuthError("");
      console.log("user data:", data);
      const user = data.user;

      // ✅ INSERT INTO profiles table
      if (user) {
        await supabase.from("profiles").insert({
          id: user.id,
          email: user.email,
          name: name,
        });
      }

      if (!data.session) {
        Alert.alert(
          "Success",
          "Please check your inbox for email verification!",
        );
        router.replace("/(auth)/login");
      } else {
        router.replace("/(tabs)");
      }
    }

    setLoading(false);
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
            className="w-full max-w-[400px] p-8"
          >
            <View className="items-center">
              <Text
                className="text-xl font-bold text-center"
                style={{ color: colors.textPrimary, marginBottom: 20 }}
              >
                Create Account
              </Text>
            </View>

            <View className="gap-0">
              <AppTextField
                label="Full Name"
                placeholder="Enter your name"
                value={name}
                onChangeText={(text) => {
                  setName(text);
                  if (nameError) validateName(text);
                }}
                error={nameError}
              />

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
                  placeholder="Create a password"
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

              <View className="mt-2">
                <AppButton
                  title="Register"
                  variant="solid"
                  onPress={signUpWithEmail}
                  loading={loading}
                  style={{ height: 50, marginBottom: 20 }}
                />
              </View>

              <View className="flex-row justify-center items-center mt-4 gap-1">
                <Text style={{ color: colors.textSecondary }}>
                  Already have an account?
                </Text>
                <Link href="/(auth)/login" asChild>
                  <TouchableOpacity>
                    <Text
                      style={{ color: colors.primary }}
                      className="font-bold"
                    >
                      Login
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
