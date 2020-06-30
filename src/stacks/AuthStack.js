import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { RegisterScreen } from '../screens/RegisterScreen.js';
import { LoginScreen } from '../screens/LoginScreen.js';

const Stack = createStackNavigator();

export const AuthStack = () => (
  <Stack.Navigator>
    <Stack.Screen name='Register' component={RegisterScreen} />
    <Stack.Screen name='Login' component={LoginScreen} />
  </Stack.Navigator>
)