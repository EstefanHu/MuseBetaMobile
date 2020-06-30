import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ProfileHomeScreen } from '../screens/ProfileHomeScreen.js';

const Stack = createStackNavigator();

export const ProfileStack = () => (
  <Stack.Navigator>
    <Stack.Screen name='ProfileHomeScreen' component={ProfileHomeScreen} />
  </Stack.Navigator>
)