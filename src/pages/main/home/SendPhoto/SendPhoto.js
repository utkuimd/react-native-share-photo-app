import React, { useEffect, useState } from 'react';
import { SafeAreaView, Image, TouchableOpacity, Text } from 'react-native';

import { useRoute, useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { setLoadedPhoto } from '../../../../utils/slices/loadedPhoto';

import * as ImagePicker from 'expo-image-picker';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../../../utils/firebase';
import uuid from 'react-native-uuid';

import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../../../utils/firebase';

import styles from './SendPhoto.style';

const SendPhoto = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const route = useRoute();
  const processID = route.params.processID;

  const { theme } = useSelector(state => state.theme);
  const userInRedux = useSelector(state => state.user);
  const username = JSON.parse(userInRedux.user).username;
  const lastPhotoID = useSelector(state => state.lastPhotoID);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImagePreview(result.uri);
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

  const writeFirestore = async (photoURL) => {
    try {
      await setDoc(doc(db, `${username}-photos`, `${username}-photo-${lastPhotoID.lastPhotoID + 1}`), {
        photoURL,
        location: {
          latitude: ((Math.random() * (41.3 - 41) + 41).toFixed(6) * 1),
          longitude: ((Math.random() * (29 - 28.5) + 28.5).toFixed(6) * 1)
        }
      });
      dispatch(setLoadedPhoto(photoURL));
      navigation.navigate('HomeScreen');
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const uploadPhoto = async () => {
    const photoURL = await uploadImageAsync(imagePreview);
    writeFirestore(photoURL);
  };

  useEffect(() => {
    pickImage();
  }, [processID]);

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: theme.backgroundColor}]}>

      <Image style={styles.preview} source={{uri: imagePreview}}/> 
      
      <TouchableOpacity style={styles.sendBtn} onPress={uploadPhoto}>
        <Text style={styles.sendText}>Send</Text>
      </TouchableOpacity>

    </SafeAreaView>
  )
}

export default SendPhoto;
