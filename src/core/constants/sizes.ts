import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const window = { width, height };

export const Sizes = {
  // Spacing scale
  xs:  4,
  sm:  8,
  md:  16,
  lg:  24,
  xl:  32,
  xxl: 48,

  // Radius
  radiusSm:   8,
  radiusMd:   16,
  radiusLg:   24,
  radiusFull: 999,

  // AppBar
  appBarHeight:    64,
  appBarPaddingH:  20,

  // BottomNav
  bottomNavHeight: 72,
  bottomNavPaddingV: 10,

  // Font sizes
  fontXs:   10,
  fontSm:   12,
  fontMd:   14,
  fontBase: 16,
  fontLg:   20,
  fontXl:   24,
  fontXxl:  32,

  // Icon sizes
  iconSm: 18,
  iconMd: 24,
  iconLg: 32,

  // Glass blur
  glassBlur:    18,
  screenBlur:   40,
} as const;

