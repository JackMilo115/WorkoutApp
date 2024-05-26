import React from 'react';
import { View, Text, Button } from 'react-native';
import { Link } from 'expo-router';

const HomeScreen = () => {
  return (
    <View>
      <Text>Home Screen</Text>
      <Link href="/activity">Go to Activity</Link>
      <Link href="/workout">Go to Workout</Link>
    </View>
  );
};

export default HomeScreen;