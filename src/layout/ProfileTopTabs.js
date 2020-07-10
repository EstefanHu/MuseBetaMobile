import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { ProfileOverviewScreen } from '../screens/profile/ProfileOverviewScreen.js';
import { ProfileUpdateScreen } from '../screens/profile/ProfileUpdateScreen.js';

const Tab = createMaterialTopTabNavigator();

export const ProfileTopTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name='ProfileOverviewScreen'
        component={ProfileOverviewScreen}
      />
      <Tab.Screen
        name='ProfileUpdateScreen'
        component={ProfileUpdateScreen}
      />
    </Tab.Navigator>
  );
}