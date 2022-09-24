import React, { useEffect, useState, useCallback } from 'react';
import { SafeAreaView, View, Text, Image, FlatList, TouchableOpacity } from 'react-native';

import { collection, getDocs, } from 'firebase/firestore';
import { db } from '../../../../utils/firebase';

import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';

import { setLastPhotoID } from '../../../../utils/slices/lastPhotoID';

import uuid from 'react-native-uuid';
import styles from './Home.style';

const Home = () => {
  const [userLoadedPhotos, setUserLoadedPhotos] = useState([]);

  const { theme } = useSelector(state => state.theme);
  const userInRedux = useSelector(state => state.user);
  const username = JSON.parse(userInRedux.user).username;
  const loadedPhotoRedux = useSelector(state => state.loadedPhoto);
  const lastPhotoID = useSelector(state => state.lastPhotoID);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const getUserPhotos = async () => {
    const querySnapshot = await getDocs(collection(db, `${username}-photos`));
    const _userLoadedPhotos = [];

    querySnapshot.forEach((doc) => {
      _userLoadedPhotos.push({
        photoURL: doc.data().photoURL,
        docID: doc.id,
      });
    });

    setUserLoadedPhotos(_userLoadedPhotos);

    if (_userLoadedPhotos.length === 0) { // User didn't upload any photo before.
      dispatch(setLastPhotoID(0)); 
    } else {
      const docIDs = _userLoadedPhotos.map(item => item.docID);
      console.log(docIDs);
      const _lastUserPhotoID = parseInt(docIDs[docIDs.length - 1].split('-')[2]);
      dispatch(setLastPhotoID(_lastUserPhotoID));
      console.log(lastPhotoID);
    }
  };

  useEffect(() => {
    getUserPhotos();
  }, [loadedPhotoRedux]);

  const gotoSendPhoto = () => {
    navigation.navigate('SendPhotoScreen', {processID: uuid.v4()});
  };

  /*function getRndLoc() {
    const rndLatitude = (Math.random() * (41.3 - 41) + 41).toFixed(6) * 1;
    const rndLongitude = (Math.random() * (29 - 28.5) + 28.5).toFixed(6) * 1;
    console.log(rndLatitude, rndLongitude);
  }*/

  const renderUserLoadedPhotos = ({item}) => <Image style={styles.loadedPhotos} source={{uri: item.photoURL}}/>
  
  return (
    <SafeAreaView style={[styles.container, {backgroundColor: theme.backgroundColor}]}>

      <TouchableOpacity style={styles.pickerProcessBtn} onPress={gotoSendPhoto}>
        <View style={styles.pickerProcessDiv}>
          <Text style={styles.pickerProcessText}>PICK AN IMAGE FROM THE LIBRARY</Text>
        </View>
      </TouchableOpacity>

      <FlatList
        ListHeaderComponent={<Text style={styles.listTitle}>{username.toUpperCase()}'s photos</Text>}
        data={userLoadedPhotos}
        renderItem={renderUserLoadedPhotos}
      />

    </SafeAreaView>
  )
}

export default Home;
