import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { ProfileTopTabs } from './../layout/ProfileTopTabs.js';

import { LibraryListScreen } from '../screens/library/LibraryListScreen.js';

const Stack = createStackNavigator();

export const LibraryStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name='LibraryListScreen'
      component={LibraryListScreen}
      initialParams={{ channel: 'All' }}
    />
    <Stack.Screen
      name='ProfileTopTabs'
      component={ProfileTopTabs}
    />
  </Stack.Navigator>
);