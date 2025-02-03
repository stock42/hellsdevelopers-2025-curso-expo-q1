import React from  'react'

import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { BoxContainer } from '@/components/BoxContainer'
import { HelloWave } from '@/components/HelloWave'

const boxes = [1, 2, 3, 4, 5, 6, 7,8, 9, 10]

export default function Index() {
    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.title}>Hello World!</Text>
                <HelloWave />
                {boxes.map((box, index) => (
                  <BoxContainer key={index} box={box} />
                ))}
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#efefef',
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#ff0000', 
        marginTop: 40,
    },
});
