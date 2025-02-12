
import { useState, useEffect } from 'react'
import { FlatList, View } from 'react-native'
import { CharacterContainer } from '@/components/CharacterContainer'
import  { Screen } from '@/components/Screen'
import { SearchBox } from '@/components/SearchBox'
import { Text } from '@/components/Text'

import { useCharacters } from '@/api-client/getCharacters'
import { type Character } from '@/types/characters'

export default function Index() {
    const { characters, refreshing, fetchCharacters } = useCharacters()
    const [searchQuery, setSearchQuery] = useState('')
    const [result, setResult] = useState<Character[]>([])


    useEffect(() => {
        if (searchQuery.length === 0) {
            setResult(characters)
        }
        const tmp = characters.filter((character) => character.name.toLowerCase().indexOf(searchQuery.toLowerCase())> -1)
        setResult(tmp)
    }, [searchQuery, characters])
    return (
    <>
        <Screen title="Dragon Expo Z" scroll={false} showHello={true} showBack={false}>
            <FlatList
                refreshing={refreshing}
                onRefresh={() => {
                    fetchCharacters()
                }}
                data={result}
                renderItem={({ item }) => <CharacterContainer key={item.id} character={item} />}
                ListEmptyComponent={() => <Text center red>No hay elementos</Text>}
                ListFooterComponent={() => (<View style={{ flex: 1, height: 100}}>
                    <Text center color="#fff">{`Total de personajes: ${characters.length}`}</Text>
                </View>) }
                ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
                style={{
                    flex: 1,
                }}
                numColumns={2}
                keyExtractor={(item) => `${item.id}`}
            />
        </Screen>
        <SearchBox onChangeText={(v) => setSearchQuery(v)} />
    </>
    )
}

