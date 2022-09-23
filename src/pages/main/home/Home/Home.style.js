import { StyleSheet, Dimensions} from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
    },
    pickerProcessBtn: {
        width: '80%',
        height: 80,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: '#1e90ff',
        marginTop: 20,
        marginBottom: 20,
    },
    pickerProcessDiv: {
        width: '98%',
        height: '90%',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#1e90ff',
        borderRadius: 10,
    },
    pickerProcessText: {
        color: '#1e90ff',
        fontSize: 18,
        textDecorationLine: 'underline',
        textDecorationColor: '#1e90ff', //Only for iOS
        textDecorationStyle: 'dotted', //Only for iOS
    },
    listTitle: {
        fontSize: 36,
        fontFamily: 'Kanit-Regular',
        color: 'brown',
        marginLeft: 10,
    },
    loadedPhotos: {
        width: Dimensions.get('screen').width / 1.25,
        height: Dimensions.get('screen').width / 1.66,
        alignSelf: 'center',
        borderRadius: 10,
        marginBottom: 10,
        marginTop: 10,
    }
})