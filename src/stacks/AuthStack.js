import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthLoginScreen } from '../screens/AuthLoginScreen.js';
import { AuthRegisterScreen } from '../screens/AuthRegisterScreen.js';

const Stack = createStackNavigator();

export const AuthStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name='AuthLoginScreen'
      component={AuthLoginScreen}
      options={{ title: '' }}
    />
    <Stack.Screen
      name='AuthRegisterScreen'
      component={AuthRegisterScreen}
    />
  </Stack.Navigator>
)