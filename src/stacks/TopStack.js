import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { TopListScreen } from '../screens/top/TopListScreen.js';
import { TopDetailScreen } from '../screens/top/TopDetailScreen.js';
import { TopEngageScreen } from '../screens/top/TopEngageScreen.js';
import { ProfileOverviewScreen } from '../screens/profile/ProfileOverviewScreen.js';
import { ProfileUpdateScreen } from '../screens/profile/ProfileUpdateScreen.js';

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
    <Stack.Screen
      name='ProfileOverviewScreen'
      component={ProfileOverviewScreen}
    />
    <Stack.Screen
      name='ProfileUpdateScreen'
      component={ProfileUpdateScreen}
    />
    </Stack.Navigator>
)