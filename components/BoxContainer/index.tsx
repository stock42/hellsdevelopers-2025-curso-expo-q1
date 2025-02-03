import React, { useState } from "react"
import { View, Text, Image, Pressable } from "react-native"
import { Link } from 'expo-router';

import { styles } from "./styles"

type Props = {
    box: number
}

export function BoxContainer({ box }: Props) {
    const [bgColor, setBgColor] = useState('#CCC')
    return (
        <View style={[styles.boxContainer, { backgroundColor: bgColor }]}>
            <Pressable
                style={styles.box}
                onPress={() => setBgColor(prev => prev === '#CCC' ? '#fcba03' : '#CCC')}
            >
                <Text style={styles.boxTitle}>{box}</Text>
            </Pressable>
            <View style={styles.box} />
            <View style={styles.box}>
                <Link href="/vegeta">
                    <Image
                        source={{ uri: 'https://dragonball-api.com/characters/vegeta_normal.webp'}}
                        style={styles.tinyLogo}
                        resizeMode="contain"
                    />
                </Link>
            </View>
            <View style={styles.box}>
            <Image
                style={styles.tinyLogo}
                source={require('@/assets/images/react-logo.png')}
            />
            </View>
        </View>
    )
}