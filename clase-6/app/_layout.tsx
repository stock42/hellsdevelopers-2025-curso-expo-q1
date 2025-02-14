import { useState, useEffect } from 'react'  
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { Bangers_400Regular } from '@expo-google-fonts/bangers';

import { initializeDB } from '@/application/initialize';
import { insertBootItem } from './boot/_database';
import { useColorScheme } from '@/hooks/useColorScheme';
const SpaceMono = require('@/assets/fonts/SpaceMono-Regular.ttf')

SplashScreen.preventAutoHideAsync();
SplashScreen.setOptions({
	duration: 1000,
	fade: true,
})


export default function RootLayout() {
  const [initialized, setInitialized] = useState(false);
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono,
    Bangers_400Regular,
  });

  useEffect(() => {
    initializeDB().then(() => {
      setInitialized(true)
      insertBootItem('DB Initialized')
    });
  }, []);

  useEffect(() => {
    if (loaded && initialized) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="character/[id]/index" options={{ headerShown: false }} />
        <Stack.Screen name="prueba/index" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
