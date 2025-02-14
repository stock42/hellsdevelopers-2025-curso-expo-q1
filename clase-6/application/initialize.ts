import { SQLiteManager } from "expo-sqlite-reactive";

import { createTable as createTableBoot, deleteAllItems as deleteAllItemsBoot, insertBootItem } from '@/app/boot/_database'
import { createTable as createTableCharacter } from '@/app/character/_database'

export async function initializeDB() {
    SQLiteManager.initialize('dragonexpoz.db')
    await createTableBoot()
    await deleteAllItemsBoot()
    await insertBootItem('table boot created')
    
    await createTableCharacter()
    await insertBootItem('table characters created')
}