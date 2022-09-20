import { StyleSheet, Dimensions } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    image1: {
        width: '100%',
        height: '45%',
        opacity: 0.1,
        position: 'absolute',
        left: '35%',
        bottom: '53%',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
    },
    createUserArea: {
        width: '80%',
        height: Dimensions.get('screen').height / 2,
    },
    signUpBtn: {
        width: '100%',
        height: 60,
        backgroundColor: 'brown',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        marginTop: 15,
    },
    signUpText: {
        fontSize: 20,
        color: 'white',
    },
    alreadyBtn: {
        width: '80%',
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'brown',
    },
    alreadyText: {
        fontSize: 16,
        color: 'brown',
        textDecorationLine: 'underline',
    }
})