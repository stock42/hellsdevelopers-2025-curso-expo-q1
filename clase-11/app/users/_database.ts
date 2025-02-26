import { SQLiteManager } from 'expo-sqlite-reactive'
import uuid from 'react-native-uuid'

export enum UserLevel {
	Admin = 50,
	User = 10,
}

export type TypeTableSchema = {
	userUUID: string
	userEmail: string
	userPassword: string
	userFirstname: string
	userLastname: string
	userLevel: number
}

export const tableName = 'users'

export async function createTable() {
	await SQLiteManager.createTable(tableName, {
		userUUID: 'TEXT NOT NULL',
		userEmail: 'TEXT',
		userPassword: 'TEXT',
		userFirstname: 'TEXT',
		userLastname: 'TEXT',
		userLevel: 'INTEGER NOT NULL DEFAULT 10',
	})
}

export async function deleteAllItems() {
	await SQLiteManager.delete(tableName)
}

export async function insertItem(userData: Omit<TypeTableSchema, 'userUUID'>) {
	const newUUID = uuid.v4()

	await SQLiteManager.insert(tableName, {
		userUUID: newUUID,
		...userData,
		userLevel: userData.userLevel || UserLevel.User,
	} as TypeTableSchema)
	return newUUID
}

export async function dropTable() {
	await SQLiteManager.dropTable(tableName)
}

export async function existsFirstOrCreate() {
	const exists = await SQLiteManager.select<TypeTableSchema>(tableName, ['*'], {})
	if (!exists || exists.length === 0) {
		await insertItem({
			userEmail: 'admin@mail.com',
			userPassword: '123456',
			userFirstname: 'Admin',
			userLastname: 'Example',
			userLevel: UserLevel.Admin,
		})
	}
}

export async function searchItems(
	filters: Partial<TypeTableSchema> = {},
	sort: Record<string, 1 | -1> = { userLastName: 1 },
): Promise<TypeTableSchema[] | null> {
	try {
		const rows = await SQLiteManager.select<TypeTableSchema>(
			tableName,
			['*'],
			filters,
			sort,
		)
		return rows
	} catch (err) {
		console.info('Error searchProducts: ', err)
		return []
	}
}

export async function countItems(): Promise<number> {
	try {
		const rows = await SQLiteManager.select<TypeTableSchema>(
			tableName,
			['*'],
			{},
			undefined,
		)
		if (!rows) return 0
		return rows.length
	} catch (err) {
		console.info('Error countProducts: ', err)
		return 0
	}
}

export async function updateEntity(userUUID: string, items: Partial<TypeTableSchema>) {
	try {
		await SQLiteManager.update(tableName, { userUUID }, items)
	} catch (err) {
		console.info('Error updateProduct: ', err)
	}
}

export async function upsertEntity(row: TypeTableSchema) {
	try {
		const existingRow = await SQLiteManager.select<TypeTableSchema>(tableName, ['*'], {
			userUUID: row.userUUID,
		})

		if (existingRow && existingRow.length > 0) {
			await SQLiteManager.update(tableName, { userUUID: row.userUUID }, row)
			console.info(`Registro con UUID ${row.userUUID} actualizado.`)
		} else {
			await SQLiteManager.insert(tableName, row)
			console.info(`Registro con UUID ${row.userUUID} insertado.`)
		}
	} catch (err) {
		console.error('Error en upsertEntity:', err)
		throw err
	}
}

export async function deleteEntity(userUUID: string) {
	try {
		await SQLiteManager.delete(tableName, { userUUID })
	} catch (err) {
		console.info('Error deleteProduct: ', err)
	}
}

export async function getEntityByEmail(userEmail: string) {
	try {
		const result = await SQLiteManager.select<TypeTableSchema>(tableName, ['*'], {
			userEmail,
		})
		return result?.[0] || null
	} catch (error) {
		console.error('Error al obtener usuario por email:', error)
		return null
	}
}

export async function checkUserAndPassword(userEmail: string, userPassword: string) {
	const user = await getEntityByEmail(userEmail)
	if (!user) return false
	return user.userPassword === userPassword
}

export async function getEntityByUUID(userUUID: string) {
	try {
		const result = await SQLiteManager.select(tableName, ['*'], { userUUID })
		return result?.[0] || null
	} catch (error) {
		console.error('Error al obtener usuario por UUID:', error)
		return null
	}
}

export default function _database() {
	return null
}
