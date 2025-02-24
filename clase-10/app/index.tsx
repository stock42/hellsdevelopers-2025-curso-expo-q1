import { Screen } from '@/components/share/Screen'
import { SearchBox } from '@/components/SearchBox'
import { Link } from '@/components/share/Link'

export default function Index() {
	return (
		<>
			<Screen
				title="Ferrak"
				scroll={false}
				showHello={true}
				showBack={false}
			>
				<Link href="/boot">Logs</Link>
				<Link href="/users">Users</Link>
				<Link href="/users/login">Users/Login</Link>
				<Link href="/backoffice">Backoffice</Link>
			</Screen>
			<SearchBox onChangeText={v => {}} />
		</>
	)
}
