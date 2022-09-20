import { View, TextInput } from 'react-native';
import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import styles from './LoginInput.style';

const LoginInput = ({iconName, placeholderText}) => {
  return (
        <View style={styles.inputArea}>
            <View style={styles.inputTextArea}>
                <MaterialIcons name={iconName} size={25} color='#bdbebd' />
                <TextInput
                    style={styles.inputText}
                    placeholder={placeholderText}
                    placeholderTextColor={'#bdbebd'}
                    onChangeText={null}
                    value={null}
                />
            </View>
        <View style={styles.underline} />
      </View>
  )
}

export default LoginInput;