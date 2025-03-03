import { useEffect, useState } from 'react'
import uuid from 'react-native-uuid'
import * as Application from 'expo-application'
import { SQLiteManager } from 'expo-sqlite-reactive'
import { insertBootItem } from '@/app/boot/_database'
import { EventEmitter } from 'events'
export const tableName = 'localstorage'

const eventEmitter = new EventEmitter()
eventEmitter.setMaxListeners(100)

const MOBILEKEY = `stock42-app-${Application.applicationId}`

type TypeKeyValue = {
	key: string
	value: string
}

export async function initLocalStorage() {
	try {
		insertBootItem(`creating table: ${tableName}`)
		await SQLiteManager.createTable(tableName, {
			key: 'text not null primary key',
			value: 'text',
		})
	} catch (err) {
		console.info('Error init Stock42: ', err)
	}
}

export const storeData = async (key: string, value: string) => {
	try {
		// Verificar si ya existe un registro con la misma clave
		const existing = await SQLiteManager.select(tableName, ['key'], { key })

		if (existing && existing.length > 0) {
			// Actualizar el registro existente
			await SQLiteManager.update(tableName, { key }, { value })
		} else {
			// Insertar un nuevo registro si no existe
			await SQLiteManager.insert(tableName, {
				key,
				value,
			})
		}

		eventEmitter.emit(`stock42-app-key-changed-${key}`, value)
		return true
	} catch (e) {
		console.error('Error storeData:', e)
		return null
	}
}

export const getData = async (key: string) => {
	try {
		const row = await SQLiteManager.select<TypeKeyValue>(
			tableName,
			['*'],
			{
				key,
			},
			undefined,
		)
		if (row?.length === 0) return null
		const jsonValue = row?.pop()?.value ?? null

		return jsonValue
	} catch (e) {
		console.info('Error getData: ', e)
		return null
	}
}

export const removeData = async (key: string) => {
	try {
		await SQLiteManager.delete(tableName, {
			key,
		})
	} catch (e) {
		console.info('Error removeData: ', e)
		return null
	}
}

export const useWatchKey = (key: string) => {
	const [value, setValue] = useState<string>('')

	useEffect(() => {
		const listener = (value: string) => {
			setValue(value)
		}
		eventEmitter.on(`stock42-app-key-changed-${key}`, listener)
		return () => {
			eventEmitter.removeListener(`stock42-app-key-changed-${key}`, listener)
		}
	}, [key])

	return value
}

export async function getDeviceId() {
	let deviceId: string | null
	deviceId = await getData(MOBILEKEY)
	if (!deviceId) {
		deviceId = uuid.v4() as string
		await storeData(MOBILEKEY, deviceId)
	}
	return deviceId
}

export default {}
