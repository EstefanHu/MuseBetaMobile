import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { TopListScreen } from '../screens/top/TopListScreen.js';
import { TopDetailScreen } from '../screens/top/TopDetailScreen.js';
import { TopEngageScreen } from '../screens/top/TopEngageScreen.js';

const Stack = createStackNavigator();

export const TopStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name='TopListScreen'
      component={TopListScreen}
      initialParams={{ channel: 'All' }}
    />
    <Stack.Screen
      name='TopDetailScreen'
      component={TopDetailScreen}
    />
    <Stack.Screen
      name='TopEngageScreen'
      component={TopEngageScreen}
    />
  </Stack.Navigator>
)