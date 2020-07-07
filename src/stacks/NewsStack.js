import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { NewsHomeScreen } from '../screens/news/NewsHomeScreen.js';

const Stack = createStackNavigator();

export const NewsStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name='NewsHomeScreen'
      component={NewsHomeScreen}
    />
  </Stack.Navigator>
)