import React, { useState, useEffect, useContext } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { Context as AuthContext } from '../providers/AuthProvider.js';
import { Container } from '../components/container.js';

export const LandingRegisterScreen = ({ navigation }) => {
  const { state, signup, clearErrorMessage } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    navigation.addListener('blur', clearErrorMessage);
  }, []);

  return (
    <Container>
      <>
        <Text style={styles.header}>Sign Up for getting tracked</Text>
        {state.errorMessage ? <Text style={styles.errorMessage}>{state.errorMessage}</Text> : null}
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          autoCapitalize='none'
          autoCorrect={false}
          value={email}
          onChangeText={text => setEmail(text)}
        />
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          secureTextEntry
          value={password}
          onChangeText={text => setPassword(text)}
        />
        <TouchableOpacity onPress={() => signup({ email, password })}>
          <Text style={styles.button}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Signin')}>
          <Text>Already being tracked? Sign In</Text>
        </TouchableOpacity>
      </>
    </Container>
  )
}

const styles = StyleSheet.create({
  header: {
    fontSize: 25
  },
  errorMessage: {
    fontSize: 16,
    color: 'red',
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: 'grey',
    borderWidth: 1,
    paddingHorizontal: 8,
    fontSize: 16
  },
  button: {
    height: 40,
    width: '100%',
    backgroundColor: '#aa00e8',
    padding: 10,
    marginVertical: 10,
    paddingHorizontal: 80,
    fontSize: 18,
    color: 'white',
  }
});