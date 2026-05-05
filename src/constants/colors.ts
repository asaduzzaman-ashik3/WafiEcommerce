// src/core/constants/colors.ts
export const Colors = {
  // Background gradient
  gradientTop: "#FAF6EF",
  gradientMid: "#F5EDD8",
  gradientBottom: "#EDE0C4",

  // Glow blobs
  glowSage: "#B5D99C", // opacity: 0.20
  glowAmber: "#F4A340", // opacity: 0.15

  // Brand
  primary: "#3A6B2A", // buttons, active icons, CTA
  primaryLight: "#5A9440", // hover states
  primaryPale: "#EAF3DF", // tag/badge backgrounds

  secondary: "#D4621A", // prices, sale, highlights
  secondaryPale: "#FADED0", // sale badge backgrounds

  accent: "#F4A340", // stars, ratings, warmth

  // Text
  textPrimary: "#1C2416", // headings, product names
  textSecondary: "#4A6040", // descriptions, subtitles
  textMuted: "#8FA882", // placeholders, hints

  // Glass surfaces
  glassBg: "rgba(255,255,255,0.40)",
  glassBorder: "rgba(255,255,255,0.85)",
  glassShadow: "rgba(58,107,42,0.10)",

  // Borders
  border: "#D8CDB8",

  // Semantic
  success: "#3A6B2A",
  warning: "#D4621A",
  error: "#B83232",
} as const;
