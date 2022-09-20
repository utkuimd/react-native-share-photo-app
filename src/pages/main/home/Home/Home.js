import { View, Text } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import styles from './Home.style';

const Home = () => {
  const user = useSelector(state => state.user);

  const showUser = () => {
    console.log(user);
  };

  return (
    <View>
      <Text>Home</Text>
      <Text onPress={showUser}>Show User</Text>
    </View>
  )
}

export default Home