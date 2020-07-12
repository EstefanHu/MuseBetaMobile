import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { ProfileOverviewScreen } from '../screens/profile/ProfileOverviewScreen.js';
import { ProfileUpdateScreen } from '../screens/profile/ProfileUpdateScreen.js';
import { ProfileBioScreen } from '../screens/profile/ProfileBioScreen.js';

const Tab = createMaterialTopTabNavigator();

export const ProfileTopTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name='ProfileOverviewScreen'
        component={ProfileOverviewScreen}
        options={{
          title: 'Overview'
        }}
      />
      <Tab.Screen
        name='ProfileUpdateScreen'
        component={ProfileUpdateScreen}
        options={{
          title: 'Update'
        }}
      />
      <Tab.Screen
        name='ProfileBioScreen'
        component={ProfileBioScreen}
        options={{
          title: 'Bio'
        }}
      />
    </Tab.Navigator>
  );
};