import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { CreateStarterScreen } from './../screens/create/CreateStarterScreen.js';
import { CreatePermissionsScreen } from '../screens/create/CreatePermissionsScreen.js';
import { CreatePreliminaryScreen } from '../screens/create/CreatePreliminaryScreen.js';
import { CreateChannelScreen } from '../screens/create/CreateChannelScreen.js';

const Stack = createStackNavigator();

export const CreateStack = ({ route }) => (
  <Stack.Navigator
    initialRouteName={
      route.params?.status === 'granted'
        ? 'CreateStarterScreen'
        : 'CreatePermissionsScreen'
    }
  >
    <Stack.Screen
      name='CreatePermissionsScreen'
      component={CreatePermissionsScreen}
      initialParams={{ status: route.params?.status }}
    />
    <Stack.Screen
      name='CreateStarterScreen'
      component={CreateStarterScreen}
    />
    <Stack.Screen
      name='CreatePreliminaryScreen'
      component={CreatePreliminaryScreen}
    />
    <Stack.Screen
      name='CreateChannelScreen'
      component={CreateChannelScreen}
    />
  </Stack.Navigator>
);