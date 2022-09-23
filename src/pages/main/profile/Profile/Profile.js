import React, { useState, useCallback } from 'react';
import { SafeAreaView, View, Text, Image, Switch, TouchableOpacity } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { setUser } from '../../../../utils/slices/userSlice';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
SplashScreen.preventAutoHideAsync();

import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './Profile.style';

const Profile = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const userInRedux = useSelector(state => state.user);

  const profileImage = JSON.parse(userInRedux.user).photoURL;
  const username = JSON.parse(userInRedux.user).username;
  const email = JSON.parse(userInRedux.user).email;

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const logout = async () => {
    await AsyncStorage.removeItem('user');
    dispatch(setUser(null));
  };

  const [fontsLoaded] = useFonts({
    'Kanit-Regular': require('../../../../../assets/fonts/Kanit-Regular.ttf'),
  });
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);
  if (!fontsLoaded) {
    return null;
  };

  const gotoEditProfile = () => {
    navigation.navigate('EditProfileScreen');
  };

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.userArea}>
        <Image style={styles.profileImage} source={{uri: profileImage}}/>
        <View style={styles.userDetail}>
          <Text style={styles.userDetailText} onLayout={onLayoutRootView}>{username}</Text>
          <Text style={styles.userDetailText} onLayout={onLayoutRootView}>{email}</Text>
        </View>
      </View>
      
      <View style={styles.changeThemeArea}>
        <Text style={styles.changeThemeText} onLayout={onLayoutRootView}>Light / Dark</Text>
        <Switch
          trackColor={{ false: '#bdbebd', true: 'blue' }}
          thumbColor='white'
          ios_backgroundColor='#3e3e3e'
          onValueChange={toggleSwitch}
          value={isEnabled}
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