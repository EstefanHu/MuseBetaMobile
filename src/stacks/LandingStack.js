import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { LandingRegisterScreen } from '../screens/LandingRegisterScreen.js';
import { LandingLoginScreen } from '../screens/LandingLoginScreen.js';

const Stack = createStackNavigator();

export const LandingStack = () => (
  <Stack.Navigator>
    <Stack.Screen name='LandingRegisterScreen' component={LandingRegisterScreen} />
    <Stack.Screen name='LandingLoginScreen' component={LandingLoginScreen} />
  </Stack.Navigator>
)