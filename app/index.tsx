import React from 'react';
import { View, Text, Button } from 'react-native';
import { Link } from 'expo-router';

const Index = () => {
  return (
    <View>
      <Text>Welcome to the Home Screen</Text>
      <Link href="/LoginScreen">Go to Login</Link>
    </View>
  );
};

export default Index;