import 'react-native-reanimated'
import { useState, useEffect } from 'react'
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import { initializeDB } from '@/application/Initialize'

import { Bangers_400Regular } from '@expo-google-fonts/bangers'

import { useColorScheme } from '@/hooks/useColorScheme'
const SpaceMono = require('@/assets/fonts/SpaceMono-Regular.ttf')

SplashScreen.preventAutoHideAsync()
SplashScreen.setOptions({
	duration: 1000,
	fade: true,
})

export default function RootLayout() {
	const colorScheme = useColorScheme()
	const [initDB, setInitDB] = useState(false)
	const [loaded] = useFonts({
		SpaceMono,
		Bangers_400Regular,
	})

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync()
			initializeDB().then(() => setInitDB(true))
		}
	}, [loaded])

	if (!loaded || !initDB) {
		return null
	}

	return (
		<ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
			<Stack>
				<Stack.Screen
					name="index"
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name="users"
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name="users/login/index"
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name="boot"
					options={{ headerShown: false }}
				/>
				<Stack.Screen name="+not-found" />
			</Stack>
			<StatusBar style="auto" />
		</ThemeProvider>
	)
}
