import { SQLiteManager } from 'expo-sqlite-reactive'
import uuid from 'react-native-uuid'

export type TypeTableSchema = {
    bootUUID: string
    bootText: string   
}

export const tableName= 'boot'

export async function createTable() {
    await SQLiteManager.createTable(tableName, {
        bootUUID: 'text primary key',
        bootText: 'text'
    })
}

export async function deleteAllItems() {
    await SQLiteManager.delete(tableName)
}

export async function insertBootItem(bootText: string) {
    const bootUUID = uuid.v4()
    await SQLiteManager.insert(tableName, {
        bootUUID,
        bootText
    })
}

export async function getData() {
    const result = await SQLiteManager.select(tableName, ['*'])
    return result
}

export default function _database() {
    return null
}