
import { FlatList, View } from 'react-native'
import { CharacterContainer } from '@/components/CharacterContainer'
import  { Screen } from '@/components/Screen'
import { SearchBox } from '@/components/SearchBox'
import { Text } from '@/components/Text'

import { useCharacters } from '@/api-client/getCharacters'

export default function Index() {
    const { characters, refreshing, fetchCharacters } = useCharacters()

    return (
    <>
        <Screen title="Dragon Expo Z" scroll={false}>
            <FlatList
                refreshing={refreshing}
                onRefresh={() => {
                    fetchCharacters()
                }}
                data={characters}
                renderItem={({ item }) => <CharacterContainer key={item.id} character={item} />}
                ListEmptyComponent={() => <Text center red>No hay elementos</Text>}
                ListHeaderComponent={() => <Text center color="#fff">ListHeaderComponent</Text>}
                ListFooterComponent={() => <Text center color="#fff">{`Total de personajes: ${characters.length}`}</Text>}
                ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
                style={{
                    marginBottom: 100,
                }}
                numColumns={2}
                keyExtractor={(item) => `${item.id}`}
            />
        </Screen>
        <SearchBox />
    </>
    )
}

