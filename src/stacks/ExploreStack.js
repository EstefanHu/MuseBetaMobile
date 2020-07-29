import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { ProfileTopTabs } from './../layout/ProfileTopTabs.js';
import { ExploreHomeScreen } from './../screens/explore/ExploreHomeScreen.js';
import { ExploreInfoScreen } from '../screens/explore/ExploreInfoScreen.js';
import { ExploreNodeScreen } from '../screens/explore/ExploreNodeScreen.js';
import { ExploreEndScreen } from '../screens/explore/ExploreEndScreen.js';

const Stack = createStackNavigator();

export const ExploreStack = () => (
  <Stack.Navigator mode='modal'>
    <Stack.Screen
      name='ExploreHomeScreen'
      component={ExploreHomeScreen}
    />
    <Stack.Screen
      name='ExploreNodeScreen'
      component={ExploreNodeScreen}
    />
    <Stack.Screen
      name='ExploreEndScreen'
      component={ExploreEndScreen}
    />
    <Stack.Screen
      name='ExploreInfoScreen'
      component={ExploreInfoScreen}
    />
    <Stack.Screen
      name='ProfileTopTabs'
      component={ProfileTopTabs}
    />
  </Stack.Navigator>
);