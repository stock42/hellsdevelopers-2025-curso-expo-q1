import { useEffect, useState } from 'react'
import { type Character } from '@/types/characters'

export function useCharacters() {
    const [characters, setCharacters] = useState<Character[]>([])
    const [refreshing, setRefreshing] = useState(false)

    async function fetchCharacters() {
        try {
            setRefreshing(true)
            const response = await fetch('https://dragonball-api.com/api/characters?limit=60')
            const json = await response.json()
            setCharacters(json.items)
        } catch (error) {
            console.error('error: ', error)
        } finally {
            setRefreshing(false)
        }
    }


    useEffect(() => {
        fetchCharacters()
    }, [])

    return {
        characters,
        refreshing,
        fetchCharacters,
    }
}


