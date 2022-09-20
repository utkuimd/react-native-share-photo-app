import { StyleSheet, Dimensions } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    imageArea: {
        width: '80%',
        height: Dimensions.get('screen').height / 4,
        top: 20,
    },
    image1: {
        width: '60%',
        height: '60%',
        borderRadius: 15,
    },
    image2: {
        width: '60%',
        height: '60%',
        borderRadius: 15,
        position: 'absolute',
        left: '40%',
        top: '40%',
    },
    textArea: {
        width: '80%',
        alignItems: 'center',
    },
    welcome: {
        fontSize: 32,
        fontWeight: 'bold',
    },
    desciption: {
        fontSize: 17,
        color: '#bdbebd',
    },
    loginArea: {
        width: '80%',
        height: Dimensions.get('screen').height / 4,
        bottom: 20,
    },
    loginBtn: {
        width: '100%',
        height: 60,
        backgroundColor: 'brown',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        marginTop: 15,
    },
    loginText: {
        fontSize: 20,
        color: 'white',
    },
    regBtn: {
        width: '80%',
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'brown',
    },
    regText: {
        fontSize: 16,
        color: 'brown',
        textDecorationLine: 'underline',
    }
})