import React from 'react'
import { Text as RNText, TextProps, TextStyle } from 'react-native'

import { styles } from './styles'
type Props = TextProps & {
	children: React.ReactNode
	h1?: unknown
	headerTitle?: unknown
	bold?: unknown
	productName?: unknown
	red?: unknown
	center?: unknown
	color?: string
	variant?: 'label'
	style?: TextStyle
}

export function Text({ children, ...props }: Props) {
	const localStyles: TextStyle = {}

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

	if (props.productName) {
		localStyles.color = '#fff'
		localStyles.fontSize = 16
		localStyles.fontFamily = 'SpaceMono'
		localStyles.textAlign = 'left'
	}

	if (props.variant === 'label') {
		localStyles.fontSize = 16
		localStyles.fontWeight = 'bold'
		localStyles.marginTop = 5
		localStyles.textAlign = 'left'
		localStyles.color = '#efefef'
		localStyles.fontFamily = 'PoppinsRegular'
	}
	return (
		<RNText
			{...props}
			style={[styles.container, localStyles, props.style]}
		>
			{children}
		</RNText>
	)
}
