import React, { useEffect } from 'react'

import { useLocalSearchParams } from 'expo-router';

import { Screen } from '@/components/Screen'
import { MainImage } from '@/components/MainImage'
import { CharacterInfo } from '@/components/CharacterInfo'
import { useCharacterInfo } from '@/api-client/getCharacterInfo'
import { Text } from '@/components/Text'

export default function Vegeta() {
    const { id } = useLocalSearchParams();
    const { characterInfo, refreshing, fetchCharacterInfo } = useCharacterInfo({ id })
    console.info('id: ', id, characterInfo)
    if (refreshing || !characterInfo) {
        return <Text center>Cargando...</Text>
    }
    return (
        <Screen title={`${characterInfo.name}`}>
            <MainImage uri={characterInfo.image} />            
            <CharacterInfo
                description={characterInfo.description}
                ki={characterInfo.ki}
                maxKi={characterInfo.maxKi}
                race={characterInfo.race}
                gender={characterInfo.gender}
                name={characterInfo.name}
                transformations={characterInfo.transformations}
            />
        </Screen>
    )
}