import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { SettingsOverviewScreen } from '../screens/settings/SettingsOverviewScreen.js';
import { SettingsUpdateScreen } from '../screens/settings/SettingsUpdateScreen.js';

const Stack = createStackNavigator();

export const SettingsStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='SettingsOverviewScreen'
        component={SettingsOverviewScreen}
      />
      <Stack.Screen
        name='SettingsUpdateScreen'
        component={SettingsUpdateScreen}
      />
    </Stack.Navigator>
  );
};