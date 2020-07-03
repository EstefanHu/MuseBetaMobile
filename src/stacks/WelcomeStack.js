import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { WelcomeIntroScreen } from '../screens/WelcomeIntroScreen.js';
import { WelcomeTermsScreen } from './../screens/WelcomeTermsScreen.js';
import { WelcomeThirdScreen } from './../screens/WelcomeThirdScreen.js';

const Stack = createStackNavigator();

export const WelcomeStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen
      name='WelcomeIntroScreen'
      component={WelcomeIntroScreen}
    />
    <Stack.Screen
      name='WelcomeTermsScreen'
      component={WelcomeTermsScreen}
    />
    <Stack.Screen
      name='WelcomeThirdScreen'
      component={WelcomeThirdScreen}
    />
  </Stack.Navigator>
);