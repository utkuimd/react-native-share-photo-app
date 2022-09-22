import React, { useState } from 'react';
import { SafeAreaView, View, Text, Image, TouchableOpacity, Alert } from 'react-native';

import { auth } from '../../../utils/firebase';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { updateProfile } from "firebase/auth";

import * as ImagePicker from 'expo-image-picker';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../../utils/firebase';
import uuid from 'react-native-uuid';

import { useNavigation } from '@react-navigation/native';
import { LoginInput } from '../../../components';
import styles from './SignUp.style';

const SignUp = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordAgain, setPasswordAgain] = useState('');
  const [username, setUsername] = useState('');
  const [profileImagePView, setProfileImagePView] = useState('https://i.pinimg.com/736x/9b/c2/bc/9bc2bcfa78b99e4803b498c8db2c6f3a.jpg');

  const createUser = async () => {
    const userProPicURL = await uploadImageAsync(profileImagePView);
    if (password === passwordAgain) {
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          updateProfile(auth.currentUser, {
            displayName: username,
            photoURL: userProPicURL,
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
  };

  const gotoSignIn = () => {
    navigation.navigate('SignInScreen');
  };

  const pickProImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setProfileImagePView(result.uri);
    }
  };

  const uploadImageAsync = async (uri) => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });
    
    const fileRef = ref(storage, uuid.v4());
    await uploadBytes(fileRef, blob);

    blob.close();
    return await getDownloadURL(fileRef);
  };

  return (
    <SafeAreaView style={styles.container}>

      <Image style={styles.image1} source={{uri: 'https://www.pngitem.com/pimgs/m/390-3901233_retro-cartoon-camera-png-download-transparent-background-cartoon.png'}}/>
      
      <Text style={styles.title}>Create An Account</Text>
      
      <View style={styles.createUserArea}>
        <LoginInput iconName='alternate-email' placeholderText='Email' setText={setEmail} text={email} />
        <LoginInput iconName='lock-outline' placeholderText='Password' setText={setPassword} text={password} hidePassword={true} />
        <LoginInput iconName='lock-outline' placeholderText='Password again' setText={setPasswordAgain} text={passwordAgain} hidePassword={true} />
        <LoginInput iconName='people' placeholderText='Username' setText={setUsername} text={username} />
        <TouchableOpacity style={styles.signUpBtn} onPress={createUser}>
          <Text style={styles.signUpText}>Sign Up!</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.chooseProPicArea}>
        <TouchableOpacity style={styles.pickProImageBtn} onPress={pickProImage}>
          <Text style={styles.pickProImageText}>Choose a profile picture</Text>
        </TouchableOpacity>
        <Image style={styles.profileImagePreview} source={{uri: profileImagePView}} />
      </View>
      
      <TouchableOpacity style={styles.alreadyBtn} onPress={gotoSignIn}>
        <Text style={styles.alreadyText}>I HAVE ALREADY AN ACCOUNT</Text>
      </TouchableOpacity>

    </SafeAreaView>
  )
}

export default SignUp;
