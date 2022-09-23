import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    editArea: {
        width: '80%',
        borderWidth: 2,
        borderColor: 'brown',
        borderRadius: 10,
        overflow: 'hidden'
    },
    editBtn: {
        width: '100%',
        backgroundColor: 'brown',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 7,
    },
    editText: {
        color: 'white',
        fontSize: 20,
    },
    chooseImageArea: {
        flexDirection: 'row',
        padding: 10,
        justifyContent: 'space-between',
    },
    chooseImageBtn: {
        width: 120,
        height: 120,
        borderWidth: 4,
        borderColor: 'brown',
        justifyContent: 'center',
        alignItems: 'center',
    },
    chooseImageText: {
        color: 'brown',
        fontSize: 20,
    },
    profileImagePreview: {
        width: 160,
        height: 120,
        borderRadius: 10,
    },
})