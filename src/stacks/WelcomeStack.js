import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { WelcomeFirstScreen } from './../screens/WelcomeFirstScreen.js';
import { WelcomeSecondScreen } from './../screens/WelcomeSecondScreen.js';
import { WelcomeThirdScreen } from './../screens/WelcomeThirdScreen.js';

const Stack = createStackNavigator();

export const WelcomeStack = () => (
  <Stack.Navigator screenOptions={{}}>
    <Stack.Screen
      name='WelcomeFirstScreen'
      component={WelcomeFirstScreen}
    />
    <Stack.Screen
      name='WelcomeSecondScreen'
      component={WelcomeSecondScreen}
    />
    <Stack.Screen
      name='WelcomeThirdScreen'
      component={WelcomeThirdScreen}
    />
  </Stack.Navigator>
);