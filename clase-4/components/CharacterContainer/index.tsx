import React, { useState } from "react"
import { View, Text, Image, TouchableOpacity, ImageBackground } from "react-native"
import { Link } from 'expo-router';

import { styles } from "./styles"

import { type Character } from '@/types/characters'
import imageBackground from '@/assets/images/background-character.png'

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
                <Text style={styles.boxTitle}>
                    {character.name}
                </Text>
                <Image
                    source={{ uri: character.image }}
                    style={styles.tinyLogo}
                    resizeMode="contain"
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