import { Platform } from 'react-native';

const PRIMARY_BLUE = '#0064a4';
const ACCENT_GOLD = '#ffd200';
const BG_CLEAN = '#FFFFFF';
const BG_ALT_GRAY = '#F4F4F4';
const TEXT_PRIMARY = '#1B3D6D';
const TEXT_SECONDARY = '#555759';
const BORDER_LIGHT = '#E5E5E5';
const SUCCESS_GREEN = '#3f9c35';
const WARNING_ORANGE = '#f78d2d';
const ERROR_RED = '#E53935';

export const Colors = {
  light: {
    text: TEXT_PRIMARY,
    background: BG_CLEAN,
    tint: PRIMARY_BLUE,
    icon: TEXT_SECONDARY,
    tabIconDefault: TEXT_SECONDARY,
    tabIconSelected: PRIMARY_BLUE,
    primaryBlue: PRIMARY_BLUE,
    accentGold: ACCENT_GOLD,
    bgClean: BG_CLEAN,
    bgAltGray: BG_ALT_GRAY,
    textPrimary: TEXT_PRIMARY,
    textSecondary: TEXT_SECONDARY,
    borderLight: BORDER_LIGHT,
    successGreen: SUCCESS_GREEN,
    warningOrange: WARNING_ORANGE,
    errorRed: ERROR_RED,
  },
  dark: {
    text: '#F4F7FB',
    background: '#0B1320',
    tint: ACCENT_GOLD,
    icon: '#A8B3C7',
    tabIconDefault: '#A8B3C7',
    tabIconSelected: ACCENT_GOLD,
    primaryBlue: '#4D8FC0',
    accentGold: ACCENT_GOLD,
    bgClean: '#0F172A',
    bgAltGray: '#111C2F',
    textPrimary: '#F4F7FB',
    textSecondary: '#B7C0D1',
    borderLight: '#24334A',
    successGreen: SUCCESS_GREEN,
    warningOrange: WARNING_ORANGE,
    errorRed: ERROR_RED,
  },
};

export const Fonts = Platform.select({
  default: {
    sans: 'Montserrat',
    serif: 'Hepta Slab',
  },
  ios: {
    sans: 'Montserrat',
    serif: 'Hepta Slab',
  },
  android: {
    sans: 'Montserrat',
    serif: 'Hepta Slab',
  },
  web: {
    sans: 'Montserrat',
    serif: 'Hepta Slab',
  },
});
