import React from 'react'
import { TouchableOpacity } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'

type Props = {
	onPress: () => void
}

export function IconCreateNew({ onPress = () => {} }: Props) {
	return (
		<TouchableOpacity
			style={{
				position: 'absolute',
				right: 20,
				bottom: 40,
				borderRadius: 45,
				borderWidth: 1,
				borderColor: '#999',
				padding: 10,
				backgroundColor: '#33333399',
			}}
			onPress={() => onPress()}
		>
			<Ionicons
				name="create-outline"
				size={24}
				color="#fff"
			/>
		</TouchableOpacity>
	)
}
