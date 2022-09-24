import React, { useEffect, useState } from 'react';
import { SafeAreaView, Image } from 'react-native';
import MapView from 'react-native-maps';
import { collection, getDocs, } from 'firebase/firestore';
import { db } from '../../../../utils/firebase';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import styles from './Map.style';

const Map = () => {
  const userInRedux = useSelector(state => state.user);
  const username = JSON.parse(userInRedux.user).username;
  const [userLoadedPhotos, setUserLoadedPhotos] = useState([]);
  const navigation = useNavigation();

  const getUserDocs = async () => {
    const querySnapshot = await getDocs(collection(db, `${username}-photos`));
    const _userLoadedPhotos = [];

    querySnapshot.forEach((doc) => {
      _userLoadedPhotos.push({
        photoURL: doc.data().photoURL,
        location: {
          latitude: doc.data().location.latitude,
          longitude: doc.data().location.longitude,
        },
        docID: doc.id,
      });
    });
    setUserLoadedPhotos(_userLoadedPhotos);
    console.log(_userLoadedPhotos);
  };

  useEffect(() => {
    getUserDocs();
  }, []);

  const showBigPhoto = (url) => {
    navigation.navigate('BigPhotoScreen', {url});
  };

  return (
    <SafeAreaView>
      <MapView style={styles.map}>
        {userLoadedPhotos.map(photo => (
          <MapView.Marker
            key={photo.docID}
            coordinate={{
              latitude: photo.location.latitude,
              longitude: photo.location.longitude
            }}
            onPress={ e => {
              e.stopPropagation();
              showBigPhoto(photo.photoURL);
            }}>
            <Image style={styles.markers} source={{uri: photo.photoURL}}/>
          </MapView.Marker>
        ))}
      </MapView>
    </SafeAreaView>
  )
}

export default Map