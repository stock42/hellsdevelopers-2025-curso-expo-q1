import React, { useState } from 'react'

import { View } from 'react-native'
import { TextInput } from '@/components/TextInput'
import { Text } from '@/components/Text'

export function SearchBox() {
    const [length, setLength] = useState(0)
    return (
        <View
            style={{
                height: 80,
                width: '100%',
                position: 'absolute',
                bottom: 0,
                paddingHorizontal: 8,
                backgroundColor: 'transparent',
            }}
        >
            <View
                style={{
                    width: '100%',
                    borderColor: 'black',
                    borderWidth: 1,
                    paddingHorizontal: 8,
                    borderRadius: 5,
                    backgroundColor: '#333',
                    flex: 1,
                }}
            >
                <TextInput
                    placeholder='Search for a character'
                    variant='normal'
                    inputMode='search'
                    onEndEditing={(v) => console.log(v)}
                    onChangeText={(v) => setLength(v.length)}
                    maxLength={30}
                />
                <Text red center bold>{`${length} / 30` }</Text>
            </View>
        </View>
    )
}