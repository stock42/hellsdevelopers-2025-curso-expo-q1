import { useEffect, useState } from 'react'
import { FlatList, View } from 'react-native'
import { Text } from '@/components/share/Text'
import { getData } from './_database'

export default function BootScreen() {
	const [logs, setLogs] = useState<any>([])

	async function fetchLogs() {
		try {
			const data = await getData()
			setLogs(data)
		} catch (err) {
			console.info('error: ', err)
		}
	}
	useEffect(() => {
		fetchLogs()
	}, [])
	return (
		<View>
			<FlatList
				data={logs}
				keyExtractor={(item, index) => index.toString()}
				renderItem={({ item }) => <Text color="#fff">{item.bootText}</Text>}
			/>
		</View>
	)
}
