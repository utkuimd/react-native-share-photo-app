import { View, Text } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import styles from './SignUp.style';

const SignUp = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.div}>
      <Text onPress={() => {navigation.navigate('SignInScreen')}}>SignUp</Text>
    </View>
  )
}

export default SignUp