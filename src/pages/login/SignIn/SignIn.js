import React, { useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, Image, Alert } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { setUser } from '../../../utils/slices/userSlice';

import { LoginInput } from '../../../components';

import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../utils/firebase';

import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './SignIn.style';

const SignIn = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const gotoSignUp = () => {
    navigation.navigate('SignUpScreen');
    setEmail('');
    setPassword('');
  };

  const login = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(response => {
        const user = response.user;
        const userNeededData = {
          email: user.email,
          username: user.displayName,
          photoURL: user.photoURL
        };
        AsyncStorage.setItem('user', JSON.stringify(userNeededData));
        dispatch(setUser(JSON.stringify(userNeededData)));
        setEmail('');
        setPassword('');
      })
      .catch(err => Alert.alert(err.message));
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
        <LoginInput iconName='alternate-email' placeholderText='Email' setText={setEmail} text={email} />
        <LoginInput iconName='lock-outline' placeholderText='Password' setText={setPassword} text={password} hidePassword={true} />
        <TouchableOpacity style={styles.loginBtn} onPress={login}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
      </View>
      
      <TouchableOpacity style={styles.noAccBtn} onPress={gotoSignUp}>
        <Text style={styles.noAccText}>I DON'T HAVE AN ACCOUNT!</Text>
      </TouchableOpacity>

    </SafeAreaView>
  )
}

export default SignIn