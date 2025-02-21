import React from 'react'
import { ScrollView, View } from 'react-native'
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context'

import { Header } from '@/components/share/Header'

import { styles } from './styles'

type Props = {
	children: React.ReactNode
	title?: string
	scroll?: boolean
	showHello?: boolean
	showBack?: boolean
}

export function Screen({ children, title, scroll = true, showHello, showBack }: Props) {
	return (
		<SafeAreaProvider>
			<SafeAreaView
				style={styles.container}
				edges={['top']}
			>
				{title ?
					<Header
						title={title}
						showHello={showHello}
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
			</SafeAreaView>
		</SafeAreaProvider>
	)
}
