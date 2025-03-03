// CreateProductScreen.tsx

import React, { useState, useEffect } from 'react'
import { Alert, StyleSheet } from 'react-native'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import { Text } from '@/components/share/Text'
import { Screen } from '@/components/share/Screen'
import { TextInput } from '@/components/share/TextInput'
import { getEntityByUUID, updateEntity } from '@/app/backoffice/products/_database'

export default function CreateProductScreen() {
	const { productUUID } = useLocalSearchParams()
	const [productName, setProductName] = useState('')
	const [productDescription, setProductDescription] = useState('')
	const [brandUUID, setBrandUUID] = useState('')
	const [modelUUID, setModelUUID] = useState('')
	const [productPrice, setProductPrice] = useState('0')
	const navigation = useNavigation()

	const handleUpdateProduct = async () => {
		console.info('handleUpdateProduct')
		if (!productName.trim()) {
			Alert.alert('Error', 'El nombre del producto es obligatorio')
			return
		}

		if (!productPrice.trim()) {
			Alert.alert('Error', 'El precio del producto es obligatorio')
			return
		}

		const newProductData = {
			productName: productName.trim(),
			productDescription: productDescription.trim(),
			brandUUID: brandUUID.trim(),
			modelUUID: modelUUID.trim(),
			productPrice: Number(productPrice.trim()), // conviértelo a número
		}

		try {
			await updateEntity(String(productUUID), newProductData)
			navigation.goBack()
		} catch (error) {
			Alert.alert('Error al crear producto', String(error))
		}
	}

	async function getProductData() {
		try {
			const productData = await getEntityByUUID(String(productUUID))
			if (!productData) {
				return
			}
			setBrandUUID(productData.brandUUID)
			setProductName(productData.productName)
			setProductDescription(productData.productDescription)
			setProductPrice(String(productData.productPrice))

			console.info('productData: ', productData)
		} catch (err) {
			console.info('Error getting product: ', err)
		}
	}

	useEffect(() => {
		getProductData()
	}, [productUUID])

	return (
		<Screen
			title="Editar producto"
			footerAction={() => handleUpdateProduct()}
			footerText="Guardar producto"
		>
			<Text variant="label">Nombre:</Text>
			<TextInput
				style={styles.input}
				onChangeText={setProductName}
				placeholder="Nombre del producto"
				defaultValue={productName}
			/>

			<Text variant="label">Descripción:</Text>
			<TextInput
				onChangeText={setProductDescription}
				placeholder="Descripción del producto"
				defaultValue={productDescription}
			/>

			<Text variant="label">Brand UUID:</Text>
			<TextInput
				onChangeText={setBrandUUID}
				placeholder="UUID de la marca"
				defaultValue={brandUUID}
			/>

			<Text variant="label">Model UUID:</Text>
			<TextInput
				onChangeText={setModelUUID}
				placeholder="UUID del modelo"
				defaultValue={modelUUID}
			/>

			<Text variant="label">Precio:</Text>
			<TextInput
				onChangeText={setProductPrice}
				inputMode="numeric"
				placeholder="Precio (numérico)"
				defaultValue={productPrice}
			/>
		</Screen>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 16,
		paddingVertical: 24,
		backgroundColor: '#fff',
	},
	title: {
		fontSize: 20,
		fontWeight: 'bold',
		marginBottom: 16,
		textAlign: 'center',
	},
	label: {
		fontSize: 16,
		marginTop: 12,
	},
	input: {
		borderWidth: 1,
		borderColor: '#ccc',
		padding: 8,
		marginTop: 4,
		borderRadius: 4,
	},
})
