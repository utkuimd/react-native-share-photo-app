import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    inputArea: {
        width: '100%',
        height: 60,
        justifyContent: 'center',
    },
    inputTextArea: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
    },
    inputText: {
        flex: 1,
        fontWeight: 'bold',
        fontSize: 20,
        marginLeft: 7,
    },
    underline: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#e9e9e9',
        marginTop: 5,
    },
})