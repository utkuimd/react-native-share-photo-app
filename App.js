import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { SignIn, SignUp } from './src/pages/login';
import { Home, Map, Profile } from './src/pages/main';

const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();

const AppNavigation = () => {
  const bool = true;
  return (
    <Stack.Navigator screenOptions={{headerShown : false}}>
      {
        bool ? (
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
    <Stack.Navigator>
      <Stack.Screen name='SignInScreen' component={SignIn} options={{headerShown: false}}/>
      <Stack.Screen
        name='SignUpScreen'
        component={SignUp}
        options={{
          headerTitle: 'Sign Up',
          headerTitleAlign: 'center',
        }}
      />
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
    <NavigationContainer>
      <AppNavigation />
    </NavigationContainer>
  )
}

export default App