import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { SupportHomeScreen } from './../screens/support/SupportHomeScreen.js';

const Stack = createStackNavigator();

export const SupportStack = () => {

  return (
    <Stack.Navigator>
      <Stack.Screen
        name='SupportHomeScreen'
        component={SupportHomeScreen}
        options={{ header: () => null }}
      />
    </Stack.Navigator>
  );
};