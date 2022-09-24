import React from 'react';
import { SafeAreaView, Image } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import styles from './BigPhoto.style';

const BigPhoto = () => {
    const route = useRoute();
    const bigPhotoURL = route.params.url;
    const { theme } = useSelector(state => state.theme);
  return (
      <SafeAreaView style={[styles.container, {backgroundColor: theme.backgroundColor}]}>
          <Image style={styles.bigPhoto} source={{uri: bigPhotoURL}}/>
      </SafeAreaView>
  )
}

export default BigPhoto;
