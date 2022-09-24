import { StyleSheet, Dimensions } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    profileImage: {
        width: Dimensions.get('screen').width / 1.66,
        height: Dimensions.get('screen').width / 2.22,
        borderRadius: 10,
    },
    userArea: {
        width: '80%',
        height: Dimensions.get('screen').height / 2.8,
        borderWidth: 2,
        borderColor: 'brown',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    userDetail: {
        alignItems: 'center',
        maxWidth: '90%',
    },
    userDetailText: {
        fontSize: 18,
    },
    changeThemeArea: {
        width: '80%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 2,
        borderColor: 'brown',
        borderRadius: 10,
        paddingLeft: 20,
        paddingRight: 10,
        bottom: '4%',
    },
    changeThemeText: {
        fontSize: 18,
    },
    editProfileBtn: {
        width: '80%',
        height: 60,
        backgroundColor: 'brown',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    editProfileText: {
        color: 'white',
        fontSize: 20,
        textDecorationLine: 'underline',
    },
    logOutBtn: {
        width: '80%',
        height: 60,
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    logOutText: {
        color: 'white',
        fontSize: 20,
    }
})