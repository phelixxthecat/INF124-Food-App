import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { HeptaSlab_400Regular, HeptaSlab_700Bold } from '@expo-google-fonts/hepta-slab';
import {
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_700Bold,
  Montserrat_800ExtraBold,
} from '@expo-google-fonts/montserrat';

import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Montserrat: Montserrat_400Regular,
    MontserratMedium: Montserrat_500Medium,
    MontserratBold: Montserrat_700Bold,
    MontserratExtraBold: Montserrat_800ExtraBold,
    'Hepta Slab': HeptaSlab_400Regular,
    'Hepta Slab Bold': HeptaSlab_700Bold,
  });
  const colorScheme = useColorScheme();

  if (!fontsLoaded) {
    return null;
  }

  const theme = Colors[colorScheme ?? 'light'];
  const navigationTheme = colorScheme === 'dark' ? DarkTheme : DefaultTheme;

  navigationTheme.colors.background = theme.background;
  navigationTheme.colors.card = theme.background;
  navigationTheme.colors.text = theme.text;
  navigationTheme.colors.primary = theme.primaryBlue;
  navigationTheme.colors.border = theme.borderLight;
  navigationTheme.colors.notification = theme.accentGold;

  return (
    <ThemeProvider value={navigationTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
