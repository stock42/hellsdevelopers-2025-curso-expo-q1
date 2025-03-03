import 'react-native-reanimated'
import { useState, useEffect } from 'react'
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import { useRouter } from 'expo-router'
import { Bangers_400Regular } from '@expo-google-fonts/bangers'
import SpaceMono from '@/assets/fonts/SpaceMono-Regular.ttf'
import PoppinsRegular from '@/assets/fonts/Poppins-Regular.ttf'

import { initializeDB } from '@/application/Initialize'
import { getData, useWatchKey } from '@/application/localStorage'
import { useColorScheme } from '@/hooks/useColorScheme'

SplashScreen.preventAutoHideAsync()
SplashScreen.setOptions({
	duration: 1000,
	fade: true,
})

export default function RootLayout() {
	const router = useRouter()
	const colorScheme = useColorScheme()
	const userValue = useWatchKey('user')
	const [initDB, setInitDB] = useState(false)
	const [loaded] = useFonts({
		SpaceMono,
		PoppinsRegular,
		Bangers_400Regular,
	})

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync()
			initializeDB().then(() => setInitDB(true))
		}
	}, [loaded])

	useEffect(() => {
		console.info('hook de control de usuario')
		if (initDB) {
			getData('user').then(user => {
				console.info('user', user, typeof user)
				if (user) {
					const userData = JSON.parse(user)
					if (userData.userLevel === 50) {
						router.push('/backoffice')
					} else {
						router.push('/home')
					}
				}
			})
		}
	}, [initDB, userValue])

	console.info('userValue: ', userValue)
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
					name="backoffice/index"
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name="backoffice/products/index"
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name="backoffice/products/[productUUID]/edit/index"
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name="users"
					options={{ headerShown: false }}
				/>

				<Stack.Screen
					name="home/index"
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name="boot/index"
					options={{ headerShown: false }}
				/>
				<Stack.Screen name="+not-found" />
			</Stack>
			<StatusBar style="auto" />
		</ThemeProvider>
	)
}
