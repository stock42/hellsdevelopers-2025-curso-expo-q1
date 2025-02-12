import React from 'react';
import { View, TouchableHighlight } from 'react-native';
import { router } from 'expo-router';
import AntDesign from '@expo/vector-icons/AntDesign';
import { HelloWave } from '@/components/HelloWave'
import { Text } from '@/components/Text'

import { styles } from './styles';

type Props = {
    title: string;
    showHello?: boolean;
    showBack?: boolean;
}
export function Header({ title, showHello = false, showBack = true }: Props) {
    return (
        <View
            style={styles.container}
        >
            {showBack ? (
                <TouchableHighlight
                style={styles.back}
                onPress={() => router.canGoBack() ? router.back() : null}
                >
                    <AntDesign name="caretleft" size={24} color="white" />
                </TouchableHighlight>
            ): null}
            
            <Text headerTitle>
                {title}
            </Text>
            {showHello ? (
                <HelloWave />
            ): null}
            
        </View>
    );
}