import React from 'react';
import { Text as RNText, TextProps, TextStyle } from 'react-native';

import { styles } from './styles';
type Props = TextProps & {
    children: React.ReactNode
    h1?: unknown
    headerTitle?: unknown
    bold?: unknown
    info?: unknown
    red?: unknown
    center?: unknown
    color?: string
    variant?: 'character-name'
}

export function Text({ children, ...props }: Props) {

    const localStyles:TextStyle = {}

    if (props.h1) {
        localStyles.fontSize = 20
        localStyles.fontWeight = 'bold'
        localStyles.color = '#fff'
    }

    if (props.color) {
        localStyles.color = props.color
    }

    if (props.headerTitle) {
        localStyles.fontSize = 18
        localStyles.fontWeight = 'bold'
        localStyles.color = 'white'
    }

    if (props.bold) {
        localStyles.fontWeight = 'bold'
    }

    if (props.red) {
        localStyles.fontWeight = 'normal'
        localStyles.color = '#ff0000'
        localStyles.fontSize = 16
    }

    if (props.center) {
        localStyles.textAlign = 'center'
    }

    if (props.info) {
        localStyles.color = '#333'
        localStyles.fontSize = 16
        localStyles.fontWeight = 'semibold'
        localStyles.textTransform = 'uppercase'
        localStyles.marginBottom = 10
        localStyles.paddingHorizontal= 8
        localStyles.paddingVertical= 4
        localStyles.borderWidth = 1
        localStyles.borderColor = '#333'
        localStyles.fontFamily = 'SpaceMono'
        localStyles.color = "#fbc02d"
    }

    if (props.variant === 'character-name') {
        localStyles.fontSize = 30
        localStyles.fontWeight = 'bold'
        localStyles.marginBottom = 5
        localStyles.textAlign = 'center'
        localStyles.color = 'yellow'
        localStyles.fontFamily = 'Bangers_400Regular'
    }
    return (
        <RNText {...props} style={[styles.container, localStyles]}>
            {children}
        </RNText>
    );
}