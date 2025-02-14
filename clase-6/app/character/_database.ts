import { SQLiteManager } from "expo-sqlite-reactive";

export type Character = {
    id: number;
    name: string;
    ki: string;       // Se maneja como string porque viene con puntos y palabras ("60.000.000", "90 Septillion")
    maxKi: string;    // Igualmente string
    race: string;
    gender: string;
    description: string;
    image: string;
    affiliation: string;
    deletedAt: string | null; // o Date | null si en tu lógica quieres manejar un objeto Date
  };

export type TypeTableSchema = Character & {
    originPlanetId: number
    originPlanetName: string;
    originPlanetIsDestroyed: boolean;
    originPlanetDescription: string;
    originPlanetImage: string;
    originPlanetDeletedAt: string | null;    
    transformations: string
  }

export const tableName = 'characters'

export async function createTable() {
    await SQLiteManager.createTable(tableName, {
        id: 'integer primary key autoincrement',
        name: 'text not null',
        ki: 'text not null',
        maxKi: 'text not null',
        race: 'text not null',
        gender: 'text not null',
        description: 'text not null',
        image: 'text not null',
        affiliation: 'text not null',
        deletedAt: 'text',
        originPlanetId: 'integer not null',
        originPlanetName: 'text not null',
        originPlanetIsDestroyed: 'integer not null',
        originPlanetDescription: 'text not null',
        originPlanetImage: 'text not null',
        originPlanetDeletedAt: 'text',
    })

    await SQLiteManager.addTableColumns(tableName, {
        transformations: 'TEXT',
      });
}

export async function deleteAllItems() {
    await SQLiteManager.delete(tableName)
}

export async function insertCharacterItem(character: TypeTableSchema) {
    await SQLiteManager.insert(tableName, character)
}

export async function getDataById(characterId: number) {
    const result = await SQLiteManager.select(tableName, ['*'], { id: characterId })
    if (result?.length ===0) return null
    return result?.pop() as TypeTableSchema
}

export default function _database() {
    return null
}