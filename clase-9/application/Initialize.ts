import { SQLiteManager } from 'expo-sqlite-reactive'
import {
	createTable as createTableBoot,
	deleteAllItems,
	insertBootItem,
} from '@/app/boot/_database'
import { initData as initUserData } from '@/app/users/_layout'

export async function initializeDB() {
	SQLiteManager.initialize('stock42-ferrak.db')
	await createTableBoot()
	await deleteAllItems()
	await insertBootItem('remove all logs')
	await initUserData()
	await insertBootItem('init user data')
}
