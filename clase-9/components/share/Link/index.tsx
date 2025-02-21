import { Link as RNLink } from 'expo-router'
import { Text } from '@/components/share/Text'

type Props = {
	href: string
	children: React.ReactNode
}

export function Link({ href, children }: Props) {
	return (
		<RNLink href={href}>
			<Text color="#fff">{children}</Text>
		</RNLink>
	)
}
