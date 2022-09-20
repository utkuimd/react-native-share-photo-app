import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { SignIn, SignUp } from './src/pages/login';
import { Home, Map, Profile } from './src/pages/main';

import { Provider, useDispatch, useSelector } from 'react-redux';
import { store } from './src/utils/store';
import { setUser } from './src/utils/slices/userSlice';

import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();

const AppNavigatior = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  const getUser = async () => {
    const userData = await AsyncStorage.getItem('user');
    const isUser = userData ? userData : null;
    dispatch(setUser(isUser));
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <Stack.Navigator screenOptions={{headerShown : false}}>
      {
        !user.user ? (
          <Stack.Screen name='LoginScreens' component={LoginStackNav}/>
        ) : (
          <Stack.Screen name='MainScreens' component={MainTabNav}/>
        )
      }
    </Stack.Navigator>
  )
}

const LoginStackNav = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name='SignInScreen' component={SignIn} />
      <Stack.Screen name='SignUpScreen'component={SignUp} />
    </Stack.Navigator>
  )
}

const MainTabNav = () => {
  return (
    <BottomTab.Navigator>
      <BottomTab.Screen name='HomeScreen' component={Home}/>
      <BottomTab.Screen name='MapScreen' component={Map}/>
      <BottomTab.Screen name='ProfileScreen' component={Profile}/>
    </BottomTab.Navigator>
  )
}

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar style='auto' />
        <AppNavigatior />
      </NavigationContainer>
    </Provider>
  )
}

export default App