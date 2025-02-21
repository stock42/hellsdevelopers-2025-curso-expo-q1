import React from 'react'
import { View, TouchableHighlight } from 'react-native'
import { router } from 'expo-router'
import AntDesign from '@expo/vector-icons/AntDesign'

import { Text } from '@/components/share/Text'

import { styles } from './styles'

type Props = {
	title: string
	showBack?: boolean
}
export function Header({ title, showBack = true }: Props) {
	return (
		<View style={styles.container}>
			{showBack ?
				<TouchableHighlight
					style={styles.back}
					onPress={() => (router.canGoBack() ? router.back() : null)}
				>
					<AntDesign
						name="caretleft"
						size={24}
						color="white"
					/>
				</TouchableHighlight>
			:	null}

			<Text headerTitle>{title}</Text>
		</View>
	)
}
