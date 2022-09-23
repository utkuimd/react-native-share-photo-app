import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { SignIn, SignUp } from './src/pages/login';
import { Home, SendPhoto, Map, Profile, EditProfile } from './src/pages/main';

import { Provider, useDispatch, useSelector } from 'react-redux';
import { store } from './src/utils/store';
import { setUser } from './src/utils/slices/userSlice';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

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
  const { theme } = useSelector(state => state.theme);
  return (
    <BottomTab.Navigator
      screenOptions={{
        tabBarActiveTintColor: 'brown',
        tabBarInactiveTintColor: 'gray',
        tabBarLabelStyle: { fontSize: 13 },
        tabBarStyle: {backgroundColor: theme.headerColor}
      }}>
      <BottomTab.Screen
        name='HomeScreens'
        component={HomeStackNav}
        options={{
          headerShown: false,
          tabBarLabel: 'Home',
          tabBarIcon: ({focused}) => (
            <MaterialCommunityIcons
              name={focused ? 'home-variant' : 'home-variant-outline'}
              size={30}
              color={focused ? 'brown' : 'gray'}
            />
          )
        }}/>
      <BottomTab.Screen name='MapScreen' component={Map}/>
      <BottomTab.Screen
        name='ProfileScreens'
        component={ProfileStackNav}
        options={{
          headerShown: false,
          tabBarLabel: 'Profile',
          tabBarIcon: ({focused}) => (
            <FontAwesome5
              name={focused ? 'user-alt' : 'user'}
              size={25}
              color={focused ? 'brown' : 'gray'}
            />
          )
        }}/>
    </BottomTab.Navigator>
  )
}

const HomeStackNav = () => {
  const { theme } = useSelector(state => state.theme);
  return(
    <Stack.Navigator>
      <Stack.Screen
        name='HomeScreen'
        component={Home}
        options={{
          headerTitle: 'Home',
          headerTitleAlign: 'center',
          headerTitleStyle: { color: 'brown' },
          headerStyle: { backgroundColor: theme.headerColor }
        }}/>
      <Stack.Screen
        name='SendPhotoScreen'
        component={SendPhoto}
        options={{
          headerTitle: 'Send Photo',
          headerTitleAlign: 'center',
          headerTitleStyle: { color: 'brown' },
          headerTintColor: 'brown',
          headerStyle: { backgroundColor: theme.headerColor }
        }}/>
    </Stack.Navigator>
  )
}

const ProfileStackNav = () => {
  const userInRedux = useSelector(state => state.user);
  const username = JSON.parse(userInRedux.user).username;
  const { theme } = useSelector(state => state.theme);
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='ProfileScreen'
        component={Profile}
        options={{
          headerTitle: username.toUpperCase(),
          headerTitleAlign: 'center',
          headerTitleStyle: { color: 'brown' },
          headerStyle: { backgroundColor: theme.headerColor }
        }}/>
      <Stack.Screen
        name='EditProfileScreen'
        component={EditProfile}
        options={{
          headerTitle: 'Edit Profile',
          headerTitleAlign: 'center',
          headerTintColor: 'brown',
          headerTitleStyle: { color: 'brown' },
          headerStyle: { backgroundColor: theme.headerColor }
        }}/>
    </Stack.Navigator>
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