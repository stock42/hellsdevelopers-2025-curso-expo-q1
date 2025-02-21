// app/(auth)/login.tsx
import React, { useState } from 'react'
import { View, Text, TextInput, Button, Switch, StyleSheet, Alert } from 'react-native'
import { useRouter } from 'expo-router'

// Importa tu función para validar usuario y contraseña
import { checkUserAndPassword } from '@/app/users/_database' // Ajusta la ruta según tu proyecto

export default function LoginScreen() {
	const router = useRouter()

	const [userEmail, setUserEmail] = useState('')
	const [userPassword, setUserPassword] = useState('')
	const [rememberSession, setRememberSession] = useState(false)

	const handleLogin = async () => {
		try {
			// Verificamos credenciales en SQLite
			const isValidUser = await checkUserAndPassword(userEmail, userPassword)
			if (!isValidUser) {
				console.info('Error', 'Usuario o contraseña inválidos')
				return
			}

			// Aquí podrías integrar lógica para almacenar la sesión
			// si `rememberSession` está en true, por ejemplo en SecureStore
			// o AsyncStorage, y luego habilitar biometría con expo-local-authentication

			// Si el login es exitoso, navega a otra pantalla
			router.push('/home')
			// (Ajusta la ruta y tu flujo de navegación según tu estructura)
		} catch (error) {
			console.error('Error en handleLogin:', error)
			Alert.alert('Error', 'Ha ocurrido un error al intentar iniciar sesión')
		}
	}

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Iniciar Sesión</Text>

			<Text style={styles.label}>Correo electrónico</Text>
			<TextInput
				style={styles.input}
				placeholder="Ingresa tu email"
				value={userEmail}
				onChangeText={setUserEmail}
				keyboardType="email-address"
				autoCapitalize="none"
			/>

			<Text style={styles.label}>Contraseña</Text>
			<TextInput
				style={styles.input}
				placeholder="Ingresa tu contraseña"
				value={userPassword}
				onChangeText={setUserPassword}
				secureTextEntry
			/>

			<View style={styles.rememberContainer}>
				<Switch
					value={rememberSession}
					onValueChange={val => setRememberSession(val)}
				/>
				<Text style={styles.rememberText}>Recordar sesión con biometría</Text>
			</View>

			<Button
				title="Ingresar"
				onPress={() => handleLogin()}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		justifyContent: 'center',
		backgroundColor: '#FFF',
	},
	title: {
		fontSize: 22,
		fontWeight: 'bold',
		marginBottom: 24,
		textAlign: 'center',
	},
	label: {
		fontSize: 16,
		marginBottom: 4,
	},
	input: {
		borderWidth: 1,
		borderColor: '#CCC',
		padding: 8,
		marginBottom: 16,
		borderRadius: 6,
	},
	rememberContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 16,
	},
	rememberText: {
		marginLeft: 8,
		fontSize: 14,
	},
})
