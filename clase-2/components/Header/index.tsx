import React from 'react';
import { View, TouchableHighlight } from 'react-native';
import { router } from 'expo-router';
import AntDesign from '@expo/vector-icons/AntDesign';
import { HelloWave } from '@/components/HelloWave'
import { Text } from '@/components/Text'

import { styles } from './styles';

export function Header({ title }: { title: string }) {
    return (
        <View
            style={styles.container}
        >
            <TouchableHighlight
                style={styles.back}
                onPress={() => router.canGoBack() ? router.back() : null}
            >
                <AntDesign name="caretleft" size={24} color="white" />
            </TouchableHighlight>
            <Text headerTitle>
                {title}
            </Text>
            <HelloWave />
        </View>
    );
}