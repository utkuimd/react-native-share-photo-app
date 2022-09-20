import { View, Text } from 'react-native';
import React from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../../../../utils/slices/userSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './Profile.style';

const Profile = () => {
  const dispatch = useDispatch();

  const logout = async () => {
    await AsyncStorage.removeItem('user');
    dispatch(setUser(null));
  };

  return (
    <View>
      <Text>Profile</Text>
      <Text onPress={logout}>Logout</Text>
    </View>
  )
}

export default Profile