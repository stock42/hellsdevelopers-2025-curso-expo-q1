import React, {
    useState,
} from  'react'

import { TextInput as RNTextInput, TextStyle, ViewStyle } from 'react-native'

import { styles } from './styles'

type Props = {
    placeholder?: string
    variant?: 'normal' | 'fullwith' | 'dark' | 'bottom-fixed' | 'top-fixed'
    inputMode?: 'none' | 'text' | 'decimal' | 'numeric' | 'tel' | 'search' | 'email' | 'url'
    multiline?: boolean
    maxLength?: number
    numberOfLines?: number
    onEndEditing?: (v: string) => void
    onChangeText?: (v: string) => void
    style?: ViewStyle & TextStyle
    placeholderTextColor?: string
}

export function TextInput({
    placeholder,
    variant,
    inputMode = 'text',
    multiline = false,
    maxLength,
    numberOfLines,
    onEndEditing = (v) => {},
    onChangeText = (v) => {},
    style,
    placeholderTextColor = '#fff'
}: Props) {
    const [searchQuery, setSearchQuery] = useState('')

    const localStyles = {}

    if (variant === 'bottom-fixed') {
        localStyles.position = 'absolute'
        localStyles.bottom = 0
    }

    if (variant === 'top-fixed') {
        localStyles.position = 'absolute'
        localStyles.top = 0
    }
    return (
        <RNTextInput
            onChangeText={(v) => {
                setSearchQuery(v)
                onChangeText(v)
            }}
            placeholder={placeholder}
            style={[styles.container, localStyles, style]}
            defaultValue={searchQuery}
            inputMode={inputMode}
            maxLength={maxLength}
            multiline={multiline}
            placeholderTextColor={placeholderTextColor}
            numberOfLines={numberOfLines}
            onBlur={() => onEndEditing(searchQuery)}
            onFocus={() => console.log('focus')}
            onEndEditing={() => console.log('end editing')}
            onSubmitEditing={() => console.log('submit')}
        />
    )
}