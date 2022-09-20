import { SafeAreaView, View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { LoginInput } from '../../../components';
import { auth } from '../../../utils/firebase';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { updateProfile } from "firebase/auth";
import styles from './SignUp.style';

const SignUp = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordAgain, setPasswordAgain] = useState('');
  const [username, setUsername] = useState('');

  const createUser = () => {
    if (password === passwordAgain) {
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          updateProfile(auth.currentUser, {
            displayName: username,
            photoURL: 'https://avatars.githubusercontent.com/u/107312837?v=4'
          })
          .catch(err => Alert.alert(err.message));
        })
        .catch(error => Alert.alert(error.message));
      setEmail('');
      setPassword('');
      setPasswordAgain('');
      setUsername('');
      navigation.navigate('SignInScreen');
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.image1} source={{uri: 'https://www.pngitem.com/pimgs/m/390-3901233_retro-cartoon-camera-png-download-transparent-background-cartoon.png'}}/>
      <View>
        <LoginInput iconName='alternate-email' placeholderText='Email' setText={setEmail} text={email} />
        <LoginInput iconName='lock-outline' placeholderText='Password' setText={setPassword} text={password} />
        <LoginInput iconName='lock-outline' placeholderText='Password again' setText={setPasswordAgain} text={passwordAgain} />
        <LoginInput iconName='people' placeholderText='Username' setText={setUsername} text={username} />
      </View>
      <TouchableOpacity style={styles.regBtn} onPress={createUser}>
        <Text style={styles.regText}>Register</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default SignUp