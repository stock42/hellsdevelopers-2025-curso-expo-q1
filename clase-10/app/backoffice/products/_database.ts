import { SQLiteManager } from 'expo-sqlite-reactive'
import uuid from 'react-native-uuid'

// Tipado para la tabla "products"
export type TypeProductsTableSchema = {
	productUUID: string
	productName: string
	productDescription: string
	brandUUID: string
	modelUUID: string
	productPrice: number
}

export const tableName = 'products'

/**
 * Crea la tabla "products" con las columnas especificadas.
 */
export async function createTable() {
	await SQLiteManager.createTable(tableName, {
		productUUID: 'TEXT NOT NULL',
		productName: 'TEXT',
		productDescription: 'TEXT',
		brandUUID: 'TEXT',
		modelUUID: 'TEXT',
		productPrice: 'INTEGER',
	})
}

/**
 * Elimina (DROP) la tabla "products".
 */
export async function dropTable() {
	await SQLiteManager.dropTable(tableName)
}

/**
 * Borra todos los registros de la tabla "products".
 */
export async function deleteAllItems() {
	await SQLiteManager.delete(tableName)
}

/**
 * Inserta un nuevo producto. Genera un `productUUID` automáticamente.
 * @param productData Datos del producto (sin incluir `productUUID`)
 * @returns El `productUUID` generado
 */
export async function insertItem(
	productData: Omit<TypeProductsTableSchema, 'productUUID'>,
) {
	const newUUID = uuid.v4() as string

	await SQLiteManager.insert(tableName, {
		productUUID: newUUID,
		...productData,
	} as TypeProductsTableSchema)

	return newUUID
}

/**
 * Busca productos en la tabla "products" con filtros y orden opcionales.
 * @param filters Filtros a aplicar
 * @param sort Orden de los resultados (por defecto ordena por `productName` ascendente)
 */
export async function searchItems(
	filters: Partial<TypeProductsTableSchema> = {},
	sort: Record<string, 1 | -1> = { productName: 1 },
): Promise<TypeProductsTableSchema[]> {
	try {
		const rows = await SQLiteManager.select<TypeProductsTableSchema>(
			tableName,
			['*'],
			filters,
			sort,
		)
		return rows || []
	} catch (err) {
		console.info('Error searchItems: ', err)
		return []
	}
}

/**
 * Retorna la cantidad de productos existentes en la tabla.
 */
export async function countItems(): Promise<number> {
	try {
		const rows = await SQLiteManager.select<TypeProductsTableSchema>(tableName, ['*'], {})
		return rows?.length || 0
	} catch (err) {
		console.info('Error countItems: ', err)
		return 0
	}
}

/**
 * Actualiza un producto usando como clave el `productUUID`.
 * @param productUUID UUID del producto a actualizar
 * @param items Campos que se desean actualizar
 */
export async function updateEntity(
	productUUID: string,
	items: Partial<TypeProductsTableSchema>,
) {
	try {
		await SQLiteManager.update(tableName, { productUUID }, items)
	} catch (err) {
		console.info('Error updateEntity: ', err)
	}
}

/**
 * Inserta o actualiza un producto (upsert) según exista o no el `productUUID`.
 * @param row Objeto de producto que se desea insertar/actualizar
 */
export async function upsertEntity(row: TypeProductsTableSchema) {
	try {
		const existingRow = await SQLiteManager.select<TypeProductsTableSchema>(
			tableName,
			['*'],
			{ productUUID: row.productUUID },
		)

		if (existingRow && existingRow.length > 0) {
			await SQLiteManager.update(tableName, { productUUID: row.productUUID }, row)
			console.info(`Registro con UUID ${row.productUUID} actualizado.`)
		} else {
			await SQLiteManager.insert(tableName, row)
			console.info(`Registro con UUID ${row.productUUID} insertado.`)
		}
	} catch (err) {
		console.error('Error en upsertEntity:', err)
		throw err
	}
}

/**
 * Elimina un producto de la tabla usando el `productUUID`.
 * @param productUUID UUID del producto a eliminar
 */
export async function deleteEntity(productUUID: string) {
	try {
		await SQLiteManager.delete(tableName, { productUUID })
	} catch (err) {
		console.info('Error deleteEntity: ', err)
	}
}

/**
 * Obtiene un producto de la tabla usando el `productUUID`.
 * @param productUUID UUID del producto
 */
export async function getEntityByUUID(productUUID: string) {
	try {
		const result = await SQLiteManager.select<TypeProductsTableSchema>(tableName, ['*'], {
			productUUID,
		})
		return result?.[0] || null
	} catch (error) {
		console.error('Error al obtener producto por UUID:', error)
		return null
	}
}

/**
 * Export default (opcional). Solo para que exista un punto de entrada.
 */
export default function _database() {
	return null
}
