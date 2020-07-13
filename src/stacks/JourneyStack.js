import React, { useEffect, useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Context as JourneyContext } from './../providers/JourneyProvider.js';

import { ProfileTopTabs } from './../layout/ProfileTopTabs.js';

import { JourneyDeploymentScreen } from '../screens/journey/JourneyHomeScreen.js';

const Stack = createStackNavigator();

export const JourneyStack = () => {
  const { state: { status } } = useContext(JourneyContext);

  return (
    <Stack.Navigator
      initialRouteName={
        status === 'inactive' ?
          'JourneyHomeScreen'
          : "JourneyLaunchScreen"
      }
    >
      <Stack.Screen
        name='JourneyHomeScreen'
        component={JourneyHomeScreen}
      />
      <Stack.Screen
        name='JourneyLaunchScreen'
        component={JourneyLaunchScreen}
      />
      <Stack.Screen
        name='ProfileTopTabs'
        component={ProfileTopTabs}
      />
    </Stack.Navigator>
  );
}