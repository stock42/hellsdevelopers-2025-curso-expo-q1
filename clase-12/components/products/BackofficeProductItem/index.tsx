import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import { useRouter } from 'expo-router'
import { Text } from '@/components/share/Text'
import { type TypeProductsTableSchema } from '@/app/backoffice/products/_database'
import AntDesign from '@expo/vector-icons/AntDesign'

import { styles } from './styles'

type Props = {
	product: TypeProductsTableSchema
}

export function BackofficeProductItem({ product }: Props) {
	const router = useRouter()
	return (
		<View style={styles.container}>
			<View
				style={{
					flex: 4,
				}}
			>
				<Text productName>{product.productName}</Text>
				<Text
					style={{
						color: '#fff',
					}}
				>
					{product.productPrice}
				</Text>
			</View>
			<TouchableOpacity
				onPress={() => {
					router.push(`/backoffice/products/${product.productUUID}/edit`)
				}}
			>
				<AntDesign
					name="edit"
					size={24}
					color="#fff"
				/>
			</TouchableOpacity>
		</View>
	)
}
