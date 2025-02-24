// CreateProductScreen.tsx

import React, { useState } from 'react'
import { Alert, StyleSheet } from 'react-native'
import { Text } from '@/components/share/Text'
import { Screen } from '@/components/share/Screen'
import { TextInput } from '@/components/share/TextInput'
import { insertItem } from '@/app/backoffice/products/_database'

export default function CreateProductScreen() {
	const [productName, setProductName] = useState('')
	const [productDescription, setProductDescription] = useState('')
	const [brandUUID, setBrandUUID] = useState('')
	const [modelUUID, setModelUUID] = useState('')
	const [productPrice, setProductPrice] = useState('')

	const handleSaveProduct = async () => {
		console.info('handleSaveProduct')
		// Validaciones simples (puedes personalizarlas)
		if (!productName.trim()) {
			Alert.alert('Error', 'El nombre del producto es obligatorio')
			return
		}

		if (!productPrice.trim()) {
			Alert.alert('Error', 'El precio del producto es obligatorio')
			return
		}

		// Prepara el objeto con los datos que no incluyan 'productUUID'
		const newProductData = {
			productName: productName.trim(),
			productDescription: productDescription.trim(),
			brandUUID: brandUUID.trim(),
			modelUUID: modelUUID.trim(),
			productPrice: Number(productPrice.trim()), // conviértelo a número
		}

		try {
			const newUUID = await insertItem(newProductData)
			Alert.alert('Éxito', `Producto creado con UUID: ${newUUID}`)
			// Limpia los campos después de crear el producto
			setProductName('')
			setProductDescription('')
			setBrandUUID('')
			setModelUUID('')
			setProductPrice('')
		} catch (error) {
			Alert.alert('Error al crear producto', String(error))
		}
	}

	return (
		<Screen
			title="Crear producto"
			footerAction={() => handleSaveProduct()}
			footerText="Guardar producto"
		>
			<Text variant="label">Nombre:</Text>
			<TextInput
				style={styles.input}
				onChangeText={setProductName}
				placeholder="Nombre del producto"
			/>

			<Text variant="label">Descripción:</Text>
			<TextInput
				onChangeText={setProductDescription}
				placeholder="Descripción del producto"
			/>

			<Text variant="label">Brand UUID:</Text>
			<TextInput
				onChangeText={setBrandUUID}
				placeholder="UUID de la marca"
			/>

			<Text variant="label">Model UUID:</Text>
			<TextInput
				onChangeText={setModelUUID}
				placeholder="UUID del modelo"
			/>

			<Text variant="label">Precio:</Text>
			<TextInput
				onChangeText={setProductPrice}
				inputMode="numeric"
				placeholder="Precio (numérico)"
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
