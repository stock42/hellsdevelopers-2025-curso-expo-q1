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