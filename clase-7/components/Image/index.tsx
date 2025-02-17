import { Image as RNImage} from 'expo-image';
import { ViewStyle } from 'react-native';

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

type Props = {
    source: string
    style?: ViewStyle
}
export function Image({ source, style }: Props) {
    return (
    <RNImage
        style={style}
        source={source}
        placeholder={{ blurhash }}
        contentFit="cover"
        transition={1000}
        />
    )
}