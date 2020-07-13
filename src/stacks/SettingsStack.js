import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { SettingsHomeScreen } from './../screens/settings/SettingsHomeScreen.js';

const Stack = createStackNavigator();

export const SettingsStack = () => {

  return (
    <Stack.Navigator>
      <Stack.Screen
        name='SettingsHomeScreen'
        component={SettingsHomeScreen}
        options={{ header: () => null }}
      />
    </Stack.Navigator>
  );
};