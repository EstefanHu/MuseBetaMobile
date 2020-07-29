import React from 'react';
import {
  View,
  TouchableOpacity
} from 'react-native';
import Animated from 'react-native-reanimated';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { ProfileOverviewScreen } from '../screens/profile/ProfileOverviewScreen.js';
import { ProfileUpdateScreen } from '../screens/profile/ProfileUpdateScreen.js';
import { ProfileStoryScreen } from '../screens/profile/ProfileStoryScreen.js';

const Tab = createMaterialTopTabNavigator();

export const ProfileTopTabs = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        labelStyle: { fontSize: 10, marginTop: -2 },
        tabStyle: {},
        style: { height: 40 },
        indicatorStyle: { backgroundColor: 'rgb(255,50,50)' }
      }}
    >
      <Tab.Screen
        name='ProfileOverviewScreen'
        component={ProfileOverviewScreen}
        options={{
          title: 'Overview'
        }}
      />
      <Tab.Screen
        name='ProfileStoryScreen'
        component={ProfileStoryScreen}
        options={{
          title: 'Stories'
        }}
      />
      <Tab.Screen
        name='ProfileUpdateScreen'
        component={ProfileUpdateScreen}
        options={{
          title: 'Update'
        }}
      />
    </Tab.Navigator>
  );
};