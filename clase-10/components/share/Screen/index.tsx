import React from 'react'
import { ScrollView, View, TouchableOpacity } from 'react-native'
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context'
import { Text } from '@/components/share/Text'
import { Header } from '@/components/share/Header'

import { styles } from './styles'

type Props = {
	children: React.ReactNode
	title?: string
	scroll?: boolean
	showBack?: boolean
	footerAction?: () => void
	footerText?: string
}

export function Screen({
	children,
	title,
	scroll = true,
	showBack,
	footerAction,
	footerText,
}: Props) {
	return (
		<SafeAreaProvider>
			<SafeAreaView
				style={styles.container}
				edges={['top']}
			>
				{title ?
					<Header
						title={title}
						showBack={showBack}
					/>
				:	null}
				{scroll ?
					<ScrollView style={styles.scrollView}>{children}</ScrollView>
				:	<View
						style={{
							flex: 1,
						}}
					>
						{children}
					</View>
				}
				{footerAction ?
					<View
						style={{
							position: 'absolute',
							bottom: 6,
							width: '100%',
							padding: 16,
							backgroundColor: 'transparent',
						}}
					>
						<TouchableOpacity
							style={{
								borderRadius: 4,
								backgroundColor: '#ffffff',
								paddingVertical: 8,
								borderWidth: 1,
								borderColor: '#333',
								shadowColor: '#000',
								shadowOffset: {
									width: 0,
									height: 6,
								},
								shadowOpacity: 0.37,
								shadowRadius: 7.49,

								elevation: 12,
							}}
							onPress={() => footerAction()}
						>
							<Text center>{footerText}</Text>
						</TouchableOpacity>
					</View>
				:	null}
			</SafeAreaView>
		</SafeAreaProvider>
	)
}
