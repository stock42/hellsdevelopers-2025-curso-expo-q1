import { SQLiteManager } from 'expo-sqlite-reactive'
import {
	createTable as createTableBoot,
	deleteAllItems,
	insertBootItem,
} from '@/app/boot/_database'
import { initData as initUserData } from '@/app/users/_layout'
import { createTable as createTableProducts } from '@/app/backoffice/products/_database'
import { initLocalStorage } from '@/application/localStorage'

export async function initializeDB() {
	SQLiteManager.initialize('stock42-ferrak.db')
	await createTableBoot()
	await deleteAllItems()
	await insertBootItem('remove all logs')
	await initUserData()
	await insertBootItem('init user data')
	await initLocalStorage()
	await insertBootItem('create products table')
	await createTableProducts()
}
