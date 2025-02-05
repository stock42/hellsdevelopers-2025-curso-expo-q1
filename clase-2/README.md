# Clase 2.

## Links

https://reactnavigation.org/

## Conceptos.

Components ScrollView

Libs: 
- @expo/vector-icons
- router de expo-router
- react-native-safe-area-context


### Compoent Screen

Es important tener un component propio para el screen y header.

```javascript
import React from 'react';
import { ScrollView } from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

import { Header } from '@/components/Header';

import { styles } from './styles';

type Props = {
    children: React.ReactNode
    title?: string

};

export function Screen({ children, title }: Props) {
    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container} edges={['top']}>
            { title ? (<Header title={title} />) : null }
            <ScrollView style={styles.scrollView}>
                {children}
            </ScrollView>
            </SafeAreaView>
        </SafeAreaProvider>

    );
}
```


### ScrollView
Si usamos imágenes, debemos evitar el uso del width y height del 100%.
Usar mejor useWindowDimensions

```javascript
import React from 'react';
import { Image, View, useWindowDimensions } from 'react-native';

import { styles } from './styles';

type Props = {
    uri: string
}

export function MainImage({ uri }: Props) {
    const {height, width, scale, fontScale} = useWindowDimensions();
    return (
        <View>
            <Image
                source={{ uri }}
                style={[styles.image, { height: height * 0.8, width }]}
                resizeMode="contain"
            />
        </View>
    );
}
```



### Use router for goBack navigation

En este component hacemos uso de router para poder navegar hacia atras, pero detectando previamente si hay alguna ruta anterior.

Ademas, vemos el uso de TouchableHighlight para hacer que el componente sea clickable y tenga feedback visual y sonoro.

```javascript
import React from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import { router } from 'expo-router';
import AntDesign from '@expo/vector-icons/AntDesign';
import { HelloWave } from '@/components/HelloWave'


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
            <Text style={styles.title}>
                {title}
            </Text>
            <HelloWave />
        </View>
    );
}
```
