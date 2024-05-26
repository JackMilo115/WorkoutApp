import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { useAppDispatch, useAppSelector } from '../src/store/hooks';
import { loginUser } from '../src/store/authSlice';
import { RootState } from '../src/store';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();
  const authStatus = useAppSelector((state: RootState) => state.auth.status);
  const error = useAppSelector((state: RootState) => state.auth.error);

  const handleLogin = () => {
    dispatch(loginUser({ email, password }));
  };

  useEffect(() => {
    if (authStatus === 'succeeded') {
      // Redirect to another screen or perform additional actions
    }
  }, [authStatus]);

  return (
    <View>
      <Text>Email:</Text>
      <TextInput value={email} onChangeText={setEmail} />
      <Text>Password:</Text>
      <TextInput value={password} onChangeText={setPassword} secureTextEntry />
      <Button title="Login" onPress={handleLogin} />
      {authStatus === 'loading' && <Text>Loading...</Text>}
      {authStatus === 'failed' && <Text>Error: {error}</Text>}
    </View>
  );
};

export default LoginScreen;