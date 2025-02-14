import { useEffect } from 'react'
import { Text, View } from 'react-native'

import { getData } from '@/app/boot/_database'

export default function TestScreen() {
        
    async function getLogs() {
        try {
            const data = await getData()
            console.info('logs: ', data)

        } catch (err) {
            console.info('error: ', err)
        }
    }
    useEffect(() => {
        getLogs()
    }, [])

    return (
        <View style={{ flex: 1, backgroundColor: '#efefef', paddingTop: 40 }}>
            <Text>Test</Text>
        </View>
    )
}