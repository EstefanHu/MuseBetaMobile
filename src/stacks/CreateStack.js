import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import * as Permissions from 'expo-permissions';

import { CreateStarterScreen } from './../screens/create/CreateStarterScreen.js';
import { CreatePermissionsScreen } from '../screens/create/CreatePermissionsScreen.js';

const Stack = createStackNavigator();

export const CreateStack = () => {
  const [isDenied, setIsDenied] = useState(true);

  useEffect(() => {
    (async () => {
      const { status } = await Permissions.getAsync(
        Permissions.AUDIO_RECORDING,
        Permissions.CAMERA,
        Permissions.CAMERA_ROLL,
      );
      if (status === 'granted') setIsDenied(false);
    })();
  }, []);

  return (
    <Stack.Navigator
      screenOptions={{ headershown: false }}
      initialRouteName={
        isDenied ? 'CreatePermissionsScreen'
          : 'CreateStarterScreen'
      }
    >
      <Stack.Screen
        name='CreatePermissionsScreen'
        component={CreatePermissionsScreen}
      />
      <Stack.Screen
        name='CreateStarterScreen'
        component={CreateStarterScreen}
      />
    </Stack.Navigator>
  );
};