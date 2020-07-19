import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { ProfileTopTabs } from './../layout/ProfileTopTabs.js';

import { ExploreHomeScreen } from './../screens/explore/ExploreHomeScreen';

const Stack = createStackNavigator();

export const ExploreStack = () => {
  return (
    <Stack.Navigator mode='modal'>
      <Stack.Screen
        name='ExploreHomeScreen'
        component={ExploreHomeScreen}
      />
      <Stack.Screen
        name='ProfileTopTabs'
        component={ProfileTopTabs}
      />
    </Stack.Navigator>
  );
};