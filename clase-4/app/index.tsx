import React, {
    useState,
    useEffect,
} from  'react'

import { FlatList, View } from 'react-native'
import { BoxContainer } from '@/components/BoxContainer'
import  { Screen } from '@/components/Screen'
import { SearchBox } from '@/components/SearchBox'
import { Text } from '@/components/Text'




export default function Index() {
    const [boxes, setBoxes] = useState<number[]>([])
    const [refreshing, setRefreshing] = useState(false)

    const fillBoxes = () => {
        setRefreshing(true)
        setBoxes([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
        setTimeout(() => {
            setRefreshing(false)
        }, 2000)
    }

    useEffect(() => {
        setTimeout(() => {
            fillBoxes()
        }, 2000)
    }, [])

    return (
    <>
        <Screen title="Dragon Ball Z" scroll={false}>
            <FlatList
                refreshing={refreshing}
                onRefresh={() => {
                    fillBoxes()
                }}
                data={boxes}
                renderItem={({ item }) => <BoxContainer key={item} box={item} />}
                ListEmptyComponent={() => <Text center red>No hay elementos</Text>}
                ListHeaderComponent={() => <Text center color="#fff">ListHeaderComponent</Text>}
                ListFooterComponent={() => <Text center color="#fff">{`Total de elementos: ${boxes.length}`}</Text>}
                ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
                style={{
                    marginBottom: 100,
                }}
                numColumns={2}
                keyExtractor={(item) => `${item}`}
            />
        </Screen>
        <SearchBox />
    </>
    )
}

