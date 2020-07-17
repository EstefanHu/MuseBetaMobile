import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { CreateStarterScreen } from './../screens/create/CreateStarterScreen.js';
import { CreatePermissionsScreen } from '../screens/create/CreatePermissionsScreen.js';

const Stack = createStackNavigator();

export const CreateStack = () => (
  <Stack.Navigator
    // initialRouteName={
    //   route.params?.status === 'granted'
    //     ? 'CreateStarterScreen'
    //     : 'CreatePermissionsScreen'
    // }
  >
    <Stack.Screen
      name='CreatePermissionsScreen'
      component={CreatePermissionsScreen}
      // initialParams={{ status: route.params?.status }}
    />
    <Stack.Screen
      name='CreateStarterScreen'
      component={CreateStarterScreen}
    />
  </Stack.Navigator>
);