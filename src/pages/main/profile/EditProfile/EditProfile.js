import React, { useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, Alert, Image } from 'react-native';

import { LoginInput } from '../../../../components';

import { auth } from '../../../../utils/firebase';
import { updateEmail, updatePassword, updateProfile } from 'firebase/auth';

import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../../../../utils/slices/userSlice';
import { useNavigation } from '@react-navigation/native';

import * as ImagePicker from 'expo-image-picker';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../../../utils/firebase';
import uuid from 'react-native-uuid';

import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './EditProfile.style';

const EditProfile = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordAgain, setPasswordAgain] = useState('');
  const [profileImagePView, setProfileImagePView] = useState('https://i.pinimg.com/736x/9b/c2/bc/9bc2bcfa78b99e4803b498c8db2c6f3a.jpg');

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const userInRedux = useSelector(state => state.user);
  const _profileImage = JSON.parse(userInRedux.user).photoURL;
  const _username = JSON.parse(userInRedux.user).username;
  const _email = JSON.parse(userInRedux.user).email;

  const editEmail = () => {
    updateEmail(auth.currentUser, email)
    .then(() => {
      const newUserData = {
        email: email,
        username: _username,
        photoURL: _profileImage,
      };
      AsyncStorage.setItem('user', JSON.stringify(newUserData));
      dispatch(setUser(JSON.stringify(newUserData)));
      navigation.goBack();
      console.log('Your email has been updated!');
    })
    .catch((error) => {
      Alert.alert(error.message);
    });
  };

  const editPassword = () => {
    const user = auth.currentUser;
    if( password === passwordAgain && password !== '') {
      updatePassword(user, password)
      .then(() => {
        navigation.goBack();
        console.log('Your password has been updated!');
      }).catch((error) => {
        Alert.alert(error.message);
      });
    } else {
      Alert.alert('Your password are not same!');
    }
  };

  const editImage = async () => {
    const profileImageURL = await uploadImageAsync(profileImagePView);
    updateProfile(auth.currentUser, {
      photoURL: profileImageURL,
    })
    .then(() => {
      const newUserData = {
        email: _email,
        username: _username,
        photoURL: profileImageURL,
      };
      AsyncStorage.setItem('user', JSON.stringify(newUserData));
      dispatch(setUser(JSON.stringify(newUserData)));
      navigation.goBack();
      console.log('Your profile image has been updated!');
    })
    .catch(err => Alert.alert(err.message));
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

      <View style={styles.editArea}>
        <LoginInput iconName='alternate-email' placeholderText='Email' setText={setEmail} text={email}/>
        <TouchableOpacity style={styles.editBtn} onPress={editEmail}>
          <Text style={styles.editText}>Save Email</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.editArea}>
        <LoginInput iconName='lock-outline' placeholderText='Password' setText={setPassword} text={password} hidePassword={true} />
        <LoginInput iconName='lock-outline' placeholderText='Password again' setText={setPasswordAgain} text={passwordAgain} hidePassword={true} />
        <TouchableOpacity style={styles.editBtn} onPress={editPassword}>
          <Text style={styles.editText}>Save Password</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.editArea}>
        <View style={styles.chooseImageArea}>
          <TouchableOpacity style={styles.chooseImageBtn} onPress={pickProImage}>
            <Text style={styles.chooseImageText}>Choose a profile image</Text>
          </TouchableOpacity>
          <Image style={styles.profileImagePreview} source={{uri: profileImagePView}} />
        </View>
        <TouchableOpacity style={styles.editBtn} onPress={editImage}>
          <Text style={styles.editText}>Save Image</Text>
        </TouchableOpacity>
      </View>
      
    </SafeAreaView>
  )
}

export default EditProfile;
