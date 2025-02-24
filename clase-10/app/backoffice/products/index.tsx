import React, { useState, useEffect } from 'react'
import { FlatList } from 'react-native'
import { useRouter } from 'expo-router'

import { searchItems, TypeProductsTableSchema } from '@/app/backoffice/products/_database'
import { Screen } from '@/components/share/Screen'
import { Text } from '@/components/share/Text'
import { BackofficeProductItem } from '@/components/products/BackofficeProductItem'
import { IconCreateNew } from '@/components/share/IconCreateNew'

export default function BackofficeProductsScreen() {
	const [products, setProducts] = useState<TypeProductsTableSchema[]>([])
	const [refreshing, setRefreshing] = useState(false)
	const router = useRouter()

	async function getProducts() {
		const products = await searchItems()
		setProducts(products)
	}

	useEffect(() => {
		getProducts()
	}, [])
	return (
		<Screen
			title="Productos"
			scroll={false}
		>
			<FlatList
				data={products}
				renderItem={({ item }) => <BackofficeProductItem product={item} />}
				refreshing={refreshing}
				onRefresh={() => {
					setRefreshing(true)
					getProducts()
					setRefreshing(false)
				}}
				ListEmptyComponent={() => (
					<Text
						center
						color="#fff"
					>
						No hay productos
					</Text>
				)}
			/>

			<IconCreateNew
				onPress={() => {
					router.push('/backoffice/products/create')
				}}
			/>
		</Screen>
	)
}
