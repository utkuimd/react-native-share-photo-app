import { SafeAreaView, View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { LoginInput } from '../../../components';
import styles from './SignIn.style';

const SignIn = () => {
  const navigation = useNavigation();

  const gotoSignUp = () => {
    navigation.navigate('SignUpScreen');
  }

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.imageArea}>
        <Image style={styles.image1} source={{uri: 'https://images.unsplash.com/photo-1615549782867-5951ae74acb7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'}}/>
        <Image style={styles.image2} source={{uri: 'https://images.unsplash.com/photo-1502323777036-f29e3972d82f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'}}/>
      </View>

      <View style={styles.textArea}>
        <Text style={styles.welcome}>Welcome</Text>
        <Text style={styles.desciption}>Let's share your best photos!</Text>
      </View>

      <View style={styles.loginArea}>
        <LoginInput iconName='alternate-email' placeholderText='Email' />
        <LoginInput iconName='lock-outline' placeholderText='Password' />
        <TouchableOpacity style={styles.loginBtn}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
      </View>
      
      <TouchableOpacity style={styles.regBtn} onPress={gotoSignUp}>
        <Text style={styles.regText}>I DON'T HAVE AN ACCOUNT!</Text>
      </TouchableOpacity>

    </SafeAreaView>
  )
}

export default SignIn