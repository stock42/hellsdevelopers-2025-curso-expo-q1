import React from  'react'

import { BoxContainer } from '@/components/BoxContainer'
import  { Screen } from '@/components/Screen'

const boxes = [1, 2, 3, 4, 5, 6, 7,8, 9, 10]


export default function Index() {
    return (
        <Screen title="Dragon Ball Z">
            {boxes.map((box, index) => (
                <BoxContainer key={index} box={box} />
            ))}
        </Screen>
    )
}

