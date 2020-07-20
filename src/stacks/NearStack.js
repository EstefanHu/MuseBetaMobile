import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';


import { ProfileTopTabs } from '../layout/ProfileTopTabs.js';

import { NearHomeScreen } from './../screens/near/NearHomeScreen.js';
import { NearNavigationScreen } from '../screens/near/NearNavigationScreen.js';

const Stack = createStackNavigator();

export const NearStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name='NearHomeScreen'
      component={NearHomeScreen}
    />
    <Stack.Screen
      name='NearNavigationScreen'
      component={NearNavigationScreen}
    />
    <Stack.Screen
      name='ProfileTopTabs'
      component={ProfileTopTabs}
    />
  </Stack.Navigator>
);