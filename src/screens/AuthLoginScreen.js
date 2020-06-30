import React, { useState, useEffect, useContext } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
} from 'react-native';
import { Context as AuthContext } from './../providers/AuthProvider.js';

export const AuthLoginScreen = ({ navigation }) => {
  const { state: { errorMessage }, login, clearErrorMessage } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    navigation.addListener('blur', clearErrorMessage);
  }, []);

  const AttemptLogin = () => {
    login({ payload: { email, password } });
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS == "ios" ? "padding" : "height"}
      >
        <View style={styles.container}>
          <View style={styles.formContainer} >
            <Text style={styles.logo}>:Muse</Text>
            {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}
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
              secureTextEntry
              value={password}
              onChangeText={text => setPassword(text)}
            />
            <TouchableOpacity
              style={styles.button}
              onPress={AttemptLogin}
            >
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.signupTextCont}>
            <Text style={styles.signupText}>Don't have an account yet?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('AuthRegisterScreen')}>
              <Text style={styles.signupButton}> Sign up!</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
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
    fontSize: 80,
    fontWeight: 'bold',
    // color: 'rgb(255,50,50)'
  },
  signupTextCont: {
    flexGrow: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingVertical: 16,
    flexDirection: 'row'
  },
  signupText: {
    fontSize: 16
  },
  signupButton: {
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