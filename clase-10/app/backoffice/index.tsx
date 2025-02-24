import React from 'react'

import { Link } from 'expo-router'
import { Text } from '@/components/share/Text'
import { Screen } from '@/components/share/Screen'

export default function BackofficeScreen() {
	return (
		<Screen title="Backoffice">
			<Text>Backoffice</Text>
			<Link href="/backoffice/products">Products</Link>
		</Screen>
	)
}
