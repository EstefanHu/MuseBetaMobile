import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';


import { ProfileTopTabs } from './../layout/ProfileTopTabs.js';

import { JourneyHomeScreen } from './../screens/journey/JourneyHomeScreen.js';
import { JourneyNavigationScreen } from '../screens/journey/JourneyNavigationScreen.js';

const Stack = createStackNavigator();

export const JourneyStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name='JourneyHomeScreen'
      component={JourneyHomeScreen}
    />
    <Stack.Screen
      name='JourneyNavigationScreen'
      component={JourneyNavigationScreen}
    />
    <Stack.Screen
      name='ProfileTopTabs'
      component={ProfileTopTabs}
    />
  </Stack.Navigator>
);