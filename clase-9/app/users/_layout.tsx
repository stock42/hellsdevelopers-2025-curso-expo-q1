import { Stack } from 'expo-router'

import { createTable, existsFirstOrCreate } from './_database'

export async function initData() {
	await createTable()
	await existsFirstOrCreate()
}

export default function UserLayout() {
	return <Stack />
}
