import React from 'react'
import { View } from 'react-native'
import { Text } from '@/components/share/Text'
import { type TypeProductsTableSchema } from '@/app/backoffice/products/_database'

import { styles } from './styles'

type Props = {
	product: TypeProductsTableSchema
}

export function BackofficeProductItem({ product }: Props) {
	return (
		<View style={styles.container}>
			<Text
				color="#fff"
				h1
			>
				{product.productName}
			</Text>
		</View>
	)
}
