import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthRegisterScreen } from '../screens/AuthRegisterScreen.js';
import { AuthLoginScreen } from '../screens/AuthLoginScreen.js';

const Stack = createStackNavigator();

export const AuthStack = () => (
  <Stack.Navigator>
    <Stack.Screen name='AuthRegisterScreen' component={AuthRegisterScreen} />
    <Stack.Screen name='AuthLoginScreen' component={AuthLoginScreen} />
  </Stack.Navigator>
)