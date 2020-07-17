import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { CreateLauncherScreen } from './../screens/create/CreateLauncherScreen.js';
import { CreatePreliminaryScreen } from './../screens/create/CreatePreliminaryScreen.js';
import { CreateChannelScreen } from '../screens/create/CreateChannelScreen.js';
import { CreateTextScreen } from './../screens/create/CreateTextScreen.js';
import { CreateImageScreen } from './../screens/create/CreateImageScreen.js';
import { CreateVideoScreen } from './../screens/create/CreateVideoScreen.js';
import { CreateAudioScreen } from './../screens/create/CreateAudioScreen.js';

const Stack = createStackNavigator();

export const CreateStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name='CreateLauncherScreen'
      component={CreateLauncherScreen}
    />
    <Stack.Screen
      name='CreatePreliminaryScreen'
      component={CreatePreliminaryScreen}
    />
    <Stack.Screen
      name='CreateChannelScreen'
      component={CreateChannelScreen}
    />
    <Stack.Screen
      name='CreateTextScreen'
      component={CreateTextScreen}
    />
    <Stack.Screen
      name='CreateImageScreen'
      component={CreateImageScreen}
    />
    <Stack.Screen
      name='CreateVideoScreen'
      component={CreateVideoScreen}
    />
    <Stack.Screen
      name='CreateAudioScreen'
      component={CreateAudioScreen}
    />
  </Stack.Navigator>
);