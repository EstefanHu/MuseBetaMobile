import React, { useState, useEffect, useContext } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { Container } from '../components/container.js';
import { Context as AuthContext } from '../providers/AuthProvider.js';

export const LandingLoginScreen = ({ navigation }) => {
  const { state, signin, clearErrorMessage } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    navigation.addListener('blur', clearErrorMessage);
  }, [])

  return (
    <Container>
      <>
        <Text style={styles.header}>Sign In</Text>
        {state.errorMessage ? <Text style={styles.errorMessage}>{state.errorMessage}</Text> : null}
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          autoCapitalize='none'
          autoCorrect={false}
          onChangeText={text => setEmail(text)}
        />
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          secureTextEntry
          value={password}
          onChangeText={text => setPassword(text)}
        />
        <TouchableOpacity onPress={() => signin({ email, password })}>
          <Text style={styles.button}>Sign In</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text>Not being tracked yet? Sign up!</Text>
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