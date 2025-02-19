
import { useState, useEffect } from 'react'
import  { Screen } from '@/components/Screen'
import { SearchBox } from '@/components/SearchBox'
import { Text } from '@/components/Text'


export default function Index() {
    return (
    <>
        <Screen title="E-commerce" scroll={false} showHello={true} showBack={false}>
          <Text>Vamos a crear un e-commerce</Text>
        </Screen>
        <SearchBox onChangeText={(v) => {}} />
    </>
    )
}

