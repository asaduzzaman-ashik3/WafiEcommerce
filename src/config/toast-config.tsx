import React from "react";
import { Dimensions } from "react-native";
import { BaseToast, ErrorToast } from "react-native-toast-message";

const { width } = Dimensions.get("window");

// ─── Shape: small radius on top, fully pill-rounded on bottom ─────────────────
const TOP_RADIUS = 10;
const BOTTOM_RADIUS = 22;

const COMMON_STYLE = {
  width: width * 0.92,
  minHeight: 40,
  borderLeftWidth: 0,

  // Top corners — subtle square feel
  borderTopLeftRadius: TOP_RADIUS,
  borderTopRightRadius: TOP_RADIUS,

  // Bottom corners — fully rounded pill
  borderBottomLeftRadius: BOTTOM_RADIUS,
  borderBottomRightRadius: BOTTOM_RADIUS,

  paddingHorizontal: 20,
  paddingVertical: 12,

  shadowColor: "#000",
  shadowOffset: { width: 0, height: 8 },
  shadowOpacity: 0.3,
  shadowRadius: 16,
  elevation: 10,

  alignItems: "center" as const,
  justifyContent: "center" as const,
};

const TEXT_1_STYLE = {
  fontSize: 15,
  fontWeight: "700" as const,
  color: "#FFFFFF",
  letterSpacing: -0.2,
};

const TEXT_2_STYLE = {
  fontSize: 13,
  fontWeight: "400" as const,
  color: "rgba(255,255,255,0.75)",
};

const CONTENT_STYLE = {
  paddingHorizontal: 8,
};

// ─── Toast Config ─────────────────────────────────────────────────────────────
const ToastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      style={[
        COMMON_STYLE,
        {
          backgroundColor: "#16A34A", // rich green
          shadowColor: "#16A34A",
        },
      ]}
      contentContainerStyle={CONTENT_STYLE}
      text1Style={TEXT_1_STYLE}
      text2Style={TEXT_2_STYLE}
    />
  ),

  error: (props: any) => (
    <ErrorToast
      {...props}
      style={[
        COMMON_STYLE,
        {
          backgroundColor: "#DC2626", // vivid red
          shadowColor: "#DC2626",
        },
      ]}
      contentContainerStyle={CONTENT_STYLE}
      text1Style={TEXT_1_STYLE}
      text2Style={TEXT_2_STYLE}
    />
  ),

  info: (props: any) => (
    <BaseToast
      {...props}
      style={[
        COMMON_STYLE,
        {
          backgroundColor: "#2563EB", // strong blue
          shadowColor: "#2563EB",
        },
      ]}
      contentContainerStyle={CONTENT_STYLE}
      text1Style={TEXT_1_STYLE}
      text2Style={TEXT_2_STYLE}
    />
  ),
};

export default ToastConfig;
