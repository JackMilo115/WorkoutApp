import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { useAppDispatch, useAppSelector } from '../src/store/hooks';
import { registerUser } from '../src/store/authSlice';
import { RootState } from '../src/store';

const RegisterScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const dispatch = useAppDispatch();
  const authStatus = useAppSelector((state: RootState) => state.auth.status);
  const error = useAppSelector((state: RootState) => state.auth.error);

  const handleRegister = () => {
    dispatch(registerUser({ email, password, firstName, lastName }));
  };

  useEffect(() => {
    if (authStatus === 'succeeded') {
      // Redirect to another screen or perform additional actions
    }
  }, [authStatus]);

  return (
    <View>
      <Text>First Name:</Text>
      <TextInput value={firstName} onChangeText={setFirstName} />
      <Text>Last Name:</Text>
      <TextInput value={lastName} onChangeText={setLastName} />
      <Text>Email:</Text>
      <TextInput value={email} onChangeText={setEmail} />
      <Text>Password:</Text>
      <TextInput value={password} onChangeText={setPassword} secureTextEntry />
      <Button title="Register" onPress={handleRegister} />
      {authStatus === 'loading' && <Text>Loading...</Text>}
      {authStatus === 'failed' && <Text>Error: {error}</Text>}
    </View>
  );
};

export default RegisterScreen;