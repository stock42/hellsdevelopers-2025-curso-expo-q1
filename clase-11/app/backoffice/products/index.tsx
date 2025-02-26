import React, { useState, useEffect, useCallback } from 'react'
import { FlatList, View } from 'react-native'
import { useRouter, useFocusEffect } from 'expo-router'

import { searchItems, TypeProductsTableSchema } from '@/app/backoffice/products/_database'
import { Screen } from '@/components/share/Screen'
import { Text } from '@/components/share/Text'
import { BackofficeProductItem } from '@/components/products/BackofficeProductItem'
import { IconCreateNew } from '@/components/share/IconCreateNew'

import { createEmptyItem } from '@/app/backoffice/products/_database'

export default function BackofficeProductsScreen() {
	const [products, setProducts] = useState<TypeProductsTableSchema[]>([])
	const [refreshing, setRefreshing] = useState(false)
	const router = useRouter()

	async function getProducts() {
		setRefreshing(true)
		const products = await searchItems()
		setProducts(products)
		setRefreshing(false)
	}

	useFocusEffect(
		useCallback(() => {
			console.info('focus called')
			getProducts()
			return () => {
				console.info('unfocus called')
			}
		}, []),
	)

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
					getProducts()
				}}
				ItemSeparatorComponent={() => (
					<View
						style={{
							height: 6,
						}}
					/>
				)}
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
				onPress={async () => {
					const productId = await createEmptyItem()
					router.push(`/backoffice/products/${productId}/edit`)
				}}
			/>
		</Screen>
	)
}
