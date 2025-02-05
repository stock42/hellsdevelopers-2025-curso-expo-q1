import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
    boxContainer: {
        borderWidth: 1,
        borderColor: '#000000',
        width: '100%',
        height: 200,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    box: {
        backgroundColor: '#4287f5',
        width: 40,
        height: 40,
        borderWidth: 1,
        borderColor: 'green'
    },
    boxTitle: {
        fontSize: 20,
        color: 'white',
        textAlign: 'center',
    },
    tinyLogo: {
        width: 40,
        height: 40,
    }
});