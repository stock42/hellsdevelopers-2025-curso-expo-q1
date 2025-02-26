import React from 'react'

import { View } from 'react-native'
import { TextInput } from '@/components/share/TextInput'

type Props = {
	onChangeText?: (v: string) => void
}
export function SearchBox({ onChangeText = () => {} }: Props) {
	return (
		<View
			style={{
				height: 80,
				width: '100%',
				paddingHorizontal: 10,
				position: 'absolute',
				bottom: 2,
			}}
		>
			<View
				style={{
					marginHorizontal: 10,
					flex: 1,
				}}
			>
				<TextInput
					placeholder="Search for a character"
					variant="normal"
					inputMode="search"
					onEndEditing={v => console.log(v)}
					onChangeText={v => onChangeText(v)}
					maxLength={30}
					style={{
						backgroundColor: '#333333EE',
						borderWidth: 1,
						borderRadius: 5,
						paddingHorizontal: 8,
						paddingVertical: 16,
						height: 50,
						color: '#fff',
						fontSize: 16,
					}}
				/>
			</View>
		</View>
	)
}
