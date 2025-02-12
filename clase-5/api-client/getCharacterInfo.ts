import { useEffect, useState } from 'react'
import { type CharacterInfo } from '@/types/characters'

type Props = {
    id: number
}

export function useCharacterInfo({ id }: Props) {
    const [characterInfo, setCharacterInfo] = useState<CharacterInfo>()
    const [refreshing, setRefreshing] = useState(false)

    async function fetchCharacterInfo() {
        try {
            setRefreshing(true)
            const response = await fetch(`https://dragonball-api.com/api/characters/${id}`)
            const json = await response.json()
            setCharacterInfo(json)
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


