import React, { useState, useEffect, useContext } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import { Context as AuthContext } from './../../providers/AuthProvider.js';

export const AuthRegisterScreen = ({ navigation }) => {
  const { state: { errorMessage }, register, clearErrorMessage } = useContext(AuthContext);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    navigation.addListener('blur', clearErrorMessage);
  }, []);

  const launchRegister = e => {
    register({
      payload: {
        name: `${firstName} ${lastName}`,
        email,
        password,
        confirmPassword
      }
    });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <View style={styles.formContainer} >
          <Text style={styles.logo}>Join the Story</Text>
          {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}
          <TextInput style={styles.inputBox}
            underlineColorAndroid='rgba(0,0,0,0)'
            placeholder="First Name"
            onSubmitEditing={() => console.log('testing')}
            value={firstName}
            autoCapitalize='none'
            autoCorrect={false}
            onChangeText={text => setFirstName(text)}
          />
          <TextInput style={styles.inputBox}
            underlineColorAndroid='rgba(0,0,0,0)'
            placeholder="Last Name"
            onSubmitEditing={() => console.log('testing')}
            value={lastName}
            autoCapitalize='none'
            autoCorrect={false}
            onChangeText={text => setLastName(text)}
          />
          <TextInput style={styles.inputBox}
            underlineColorAndroid='rgba(0,0,0,0)'
            placeholder="Email Address"
            keyboardType="email-address"
            onSubmitEditing={() => console.log('testing')}
            value={email}
            autoCapitalize='none'
            autoCorrect={false}
            onChangeText={text => setEmail(text)}
          />
          <TextInput style={styles.inputBox}
            underlineColorAndroid='rgba(0,0,0,0)'
            placeholder="Password"
            secureTextEntry={true}
            value={password}
            autoCapitalize='none'
            autoCorrect={false}
            onChangeText={text => setPassword(text)}
          />
          <TextInput style={styles.inputBox}
            underlineColorAndroid='rgba(0,0,0,0)'
            placeholder="Confirm Password"
            secureTextEntry={true}
            value={confirmPassword}
            autoCapitalize='none'
            autoCorrect={false}
            onChangeText={text => setConfirmPassword(text)}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={launchRegister}
          >
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.loginTextCont}>
          <Text style={styles.loginText}>Already have an Account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('AuthLoginScreen')}>
            <Text style={styles.loginButton}> Log in!</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  logo: {
    fontWeight: 'bold',
    fontSize: 40
  },
  loginTextCont: {
    flexGrow: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingVertical: 16,
    flexDirection: 'row'
  },
  loginText: {
    fontSize: 16
  },
  loginButton: {
    color: '#a8a8a8',
    fontSize: 16,
    fontWeight: '500'
  },
  formContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputBox: {
    width: 300,
    backgroundColor: '#ebebeb',
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 13,
    fontSize: 16,
    marginVertical: 10
  },
  button: {
    width: 300,
    backgroundColor: 'rgb(255, 50, 50)',
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 13
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center'
  }
});