import React, { useState } from "react"
import { View,   ImageBackground } from "react-native"
import { Link } from 'expo-router';

import { Text } from '@/components/Text'
import { styles } from "./styles"

import { type Character } from '@/types/characters'
import imageBackground from '@/assets/images/background-character.png'
import { Image } from '@/components/Image'

type Props = {
    character: Character
}

export function CharacterContainer({ character }: Props) {
    const [bgColor, setBgColor] = useState('#CCC')
    return (
    <View style={styles.boxContainer}>
    
      <Link href={`/character/${character.id}`} >
        
            <ImageBackground
                source={imageBackground}
                style={styles.backgroundImage}
                resizeMode="cover"
            >
            <View style={styles.innerContainer}>      
                <Text variant="character-name">
                    {character.name}
                </Text>
                <Image
                    source={character.image }
                    style={styles.tinyLogo}
                />
                <Text style={{ color: '#fff' }}>Ki: {character.ki}</Text>
                <Text style={{ color: '#fff' }}>Max Ki: {character.maxKi}</Text>
                <Text style={{ color: '#fff' }}>Race: {character.race}</Text>
                <Text style={{ color: '#fff' }}>Gender: {character.gender}</Text>
                <Text style={{ color: '#fff' }}>Affiliation: {character.affiliation}</Text>
                </View>        
            </ImageBackground>
      </Link>
    </View>
    )
}