import React, { useEffect, useState } from 'react';
import { View, Text, Image, Button, FlatList, SafeAreaView } from 'react-native';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../../../utils/firebase';
import uuid from 'react-native-uuid';
import { addDoc, collection, getDocs, doc, setDoc } from 'firebase/firestore';
import { db } from '../../../../utils/firebase';
import styles from './Home.style';

const Home = () => {
  const userInRedux = useSelector(state => state.user);
  const [image, setImage] = useState(null);
  const [arr, setArr] = useState([]);
  const [lastUserPhotoID, setLastUserPhotoID] = useState(0);

  const showUser = async () => {
    const userInLocal = await AsyncStorage.getItem('user');
    console.log(userInLocal);
    console.log(userInRedux);
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      
      const photoURL = await uploadImageAsync(result.uri);
      console.log('photoURL:',photoURL);
      writeFirestore(photoURL);
    }
  };

  async function uploadImageAsync(uri) {
    // Why are we using XMLHttpRequest? See:
    // https://github.com/expo/expo/issues/2402#issuecomment-443726662
    let i = 1;
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
    const result = await uploadBytes(fileRef, blob);
    console.log(blob._data.name);
  
    // We're done with the blob, close and release it
    blob.close();
  
    return await getDownloadURL(fileRef);
  };

  const writeFirestore = async (photoURL) => {
    try {
      /*const docRef = await addDoc(collection(db, "userPhotos"), {
        photoURL,
      });*/
      let i = 1;
      await setDoc(doc(db, "userPhotos", `user-photo-${lastUserPhotoID + 1}`), {
        photoURL,
      });
      setImage(photoURL);
      console.log("Document wrote with success!");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  const showUserPhotos = async () => {
    const querySnapshot = await getDocs(collection(db, "userPhotos"));
    const _arr = [];
    querySnapshot.forEach((doc) => {
      _arr.push(doc.id);
    });
    console.log(_arr);
    const _lastUserPhotoID = parseInt(_arr[_arr.length - 1].split('-')[2]);
    console.log(typeof(_lastUserPhotoID), _lastUserPhotoID);
    setLastUserPhotoID(_lastUserPhotoID);
    
  };

  const getUserPhotos = async () => {
    const querySnapshot = await getDocs(collection(db, "userPhotos"));
    const _arr = [];
    querySnapshot.forEach((doc) => {
      _arr.push({
        photoURL: doc.data().photoURL,
      });
    });
    setArr(_arr);
    console.log(arr);
  }

  useEffect(() => {
    getUserPhotos();
    showUserPhotos();
  }, []);

  useEffect(() => {
    getUserPhotos();
  }, [image])

  const renderUserPhotos = ({item}) => <Image style={{width: 200, height: 200}} source={{uri: item.photoURL}}/>
  return (
    <SafeAreaView style={{flex: 1}}>
      <Text>Home</Text>
      <Text onPress={showUser}>Show User</Text>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
      <Text onPress={showUserPhotos}>SHOW USER PHOTOS İD'S</Text>
      <Text onPress={getUserPhotos}>GET USER PHOTOURLS</Text>
      <FlatList 
        data={arr}
        renderItem={renderUserPhotos}
        numColumns={2}
      />
    </SafeAreaView>
  )
}

export default Home