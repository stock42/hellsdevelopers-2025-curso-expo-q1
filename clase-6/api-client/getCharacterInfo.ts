import { useEffect, useState } from 'react'

import { getDataById, insertCharacterItem, TypeTableSchema } from '@/app/character/_database';

type Props = {
    id: number
}

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
  
export type CharacterInfo = Character & {
    originPlanet: {
        id: number;
        name: string;
        isDestroyed: boolean;
        description: string;
        image: string;
        deletedAt: string | null;
    };
    transformations: Array<{
        id: number;
        name: string;
        image: string;
        ki: string;
        deletedAt: string | null;
    }>;
}
 

export function useCharacterInfo({ id }: Props) {
    const [characterInfo, setCharacterInfo] = useState<TypeTableSchema>()
    const [refreshing, setRefreshing] = useState(false)

    async function fetchCharacterInfo() {
        try {
            setRefreshing(true)
            const cacheData = await getDataById(id)
            if (cacheData) {
                console.info('from local database')
                setCharacterInfo(cacheData)
            } else  {
                console.info('from network')
                const response = await fetch(`https://dragonball-api.com/api/characters/${id}`)
                const json = await response.json()
                insertCharacterItem({
                    id: json.id,
                    name: json.name,
                    ki: json.ki,
                    maxKi: json.maxKi,
                    race: json.race,
                    deletedAt: json.deletedAt,
                    affiliation: json.affiliation,
                    image: json.image,
                    description: json.description,
                    gender: json.gender,
                    originPlanetId: json.originPlanet.id,
                    originPlanetName: json.originPlanet.name,
                    originPlanetDescription: json.originPlanet.description,
                    originPlanetImage: json.originPlanet.image,
                    originPlanetDeletedAt: json.originPlanet.deletedAt,
                    originPlanetIsDestroyed: json.originPlanet.isDestroyed,
                    transformations: JSON.stringify(json.transformations),
                })
                const savedData = await getDataById(id)
                setCharacterInfo(savedData)
            }
            
        } catch (error) {
            console.error('error: ', error)
        } finally {
            setRefreshing(false)
        }
    }


    useEffect(() => {
        fetchCharacterInfo()
    }, [])

    return {
        characterInfo,
        refreshing,
        fetchCharacterInfo,
    }
}


