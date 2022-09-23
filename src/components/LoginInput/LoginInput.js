import React from 'react';
import { View, TextInput } from 'react-native';
import { useSelector } from 'react-redux';
import { MaterialIcons } from '@expo/vector-icons';
import styles from './LoginInput.style';

const LoginInput = ({iconName, placeholderText, setText, text, hidePassword}) => {
    const { theme } = useSelector(state => state.theme);
    return (
        <View style={styles.inputArea}>
            <View style={styles.inputTextArea}>
                <MaterialIcons name={iconName} size={25} color='#bdbebd' />
                <TextInput
                    style={[styles.inputText, {color: theme.color}]}
                    placeholder={placeholderText}
                    placeholderTextColor={'#bdbebd'}
                    onChangeText={setText}
                    value={text}
                    secureTextEntry={hidePassword}
                />
            </View>
        <View style={styles.underline} />
      </View>
  )
}

export default LoginInput;