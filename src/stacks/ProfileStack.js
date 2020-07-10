import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { ProfileOverviewScreen } from '../screens/profile/ProfileOverviewScreen.js';
import { ProfileUpdateScreen } from '../screens/profile/ProfileUpdateScreen.js';

const Stack = createStackNavigator();

export const ProfileStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='ProfileOverviewScreen'
        component={ProfileOverviewScreen}
      />
      <Stack.Screen
        name='ProfileUpdateScreen'
        component={ProfileUpdateScreen}
      />
      
    </Stack.Navigator>
  );
};