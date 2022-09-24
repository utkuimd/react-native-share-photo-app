import React, { useState, useCallback } from 'react';
import { SafeAreaView, View, Text, Image, Switch, TouchableOpacity } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { setUser } from '../../../../utils/slices/userSlice';
import { toggleTheme } from '../../../../utils/slices/themeSlice';
import { useFonts } from 'expo-font';

import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './Profile.style';

const Profile = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const userInRedux = useSelector(state => state.user);
  const { theme } = useSelector(state => state.theme);

  const profileImage = JSON.parse(userInRedux.user).photoURL;
  const username = JSON.parse(userInRedux.user).username;
  const email = JSON.parse(userInRedux.user).email;

  const [lightOrDark, setLightOrDark] = useState(false); 

  const toggleSwitch = () => {
    setLightOrDark(!lightOrDark);
    dispatch(toggleTheme());
    console.log(JSON.stringify(theme));
  }

  const logout = async () => {
    await AsyncStorage.removeItem('user');
    dispatch(setUser(null));
  };

  const gotoEditProfile = () => {
    navigation.navigate('EditProfileScreen');
  };

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: theme.backgroundColor}]}>

      <View style={styles.userArea}>
        <Image style={styles.profileImage} source={{uri: profileImage}}/>
        <View style={styles.userDetail}>
          <Text style={[styles.userDetailText, {color: theme.color}]}>{username}</Text>
          <Text style={[styles.userDetailText, {color: theme.color}]}>{email}</Text>
        </View>
      </View>
      
      <View style={styles.changeThemeArea}>
        <Text style={[styles.changeThemeText, {color: theme.color}]}>Light / Dark</Text>
        <Switch
          trackColor={{ false: '#bdbebd', true: 'blue' }}
          thumbColor='white'
          ios_backgroundColor='#3e3e3e'
          onValueChange={toggleSwitch}
          value={lightOrDark}
        />
      </View>

      <TouchableOpacity style={styles.editProfileBtn} onPress={gotoEditProfile}>
        <Text style={styles.editProfileText}>Edit Profile</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.logOutBtn} onPress={logout}>
        <Text style={styles.logOutText}>Logout</Text>
      </TouchableOpacity>

    </SafeAreaView>
  )
}

export default Profile