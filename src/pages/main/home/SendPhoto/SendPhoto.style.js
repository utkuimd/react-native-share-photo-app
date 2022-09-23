import { StyleSheet, Dimensions } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    preview: {
        borderRadius: 10,
        width: Dimensions.get('screen').width / 1.25,
        height: Dimensions.get('screen').width / 1.66,
    },
    sendBtn: {
        width: '80%',
        height: 60,
        backgroundColor: 'brown',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        marginTop: 15,
    },
    sendText: {
        fontSize: 20,
        color: 'white',
    },
})