import { SQLiteManager } from 'expo-sqlite-reactive'
import uuid from 'react-native-uuid'

export type TypeTableSchema = {
	bootUUID: string
	bootText: string
}

export const tableName = 'boot'

export async function createTable() {
	await SQLiteManager.createTable(tableName, {
		bootUUID: 'text primary key',
		bootText: 'text',
	})
}

export async function deleteAllItems() {
	await SQLiteManager.delete(tableName)
}

export async function insertBootItem(bootText: string) {
	const newUUID = uuid.v4()

	await SQLiteManager.insert(tableName, {
		bootUUID: newUUID,
		bootText,
	} as TypeTableSchema)
	return newUUID
}

export async function dropTable() {
	await SQLiteManager.dropTable(tableName)
}

export async function getData() {
	try {
		const logs = await SQLiteManager.select<TypeTableSchema>(tableName, ['*'])
		return logs
	} catch (err) {
		console.info('getCompanyData: ', err)
		return null
	}
}

export default function _database() {
	return null
}
