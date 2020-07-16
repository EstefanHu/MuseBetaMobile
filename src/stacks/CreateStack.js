import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import * as Permissions from 'expo-permissions';

import { CreateStarterScreen } from './../screens/create/CreateStarterScreen.js';
import { CreatePermissionsScreen } from '../screens/create/CreatePermissionsScreen.js';

const Stack = createStackNavigator();

export const CreateStack = () => {
  const [permissionStatus, setPermissionStatus] = useState();

  useEffect(() => {
    (async () => {
      const { status } = await Permissions.getAsync(
        Permissions.AUDIO_RECORDING,
        Permissions.CAMERA,
        Permissions.CAMERA_ROLL,
      );

      setPermissionStatus(status);
    })();
  }, []);

  return (
    <Stack.Navigator
      initialRouteName={
        permissionStatus === 'granted' ? 'CreateStarterScreen'
          : 'CreatePermissionsScreen'
      }
    >
      <Stack.Screen
        name='CreatePermissionsScreen'
        component={CreatePermissionsScreen}
        initialParams={{ status: permissionStatus }}
      />
      <Stack.Screen
        name='CreateStarterScreen'
        component={CreateStarterScreen}
      />
    </Stack.Navigator>
  );
};