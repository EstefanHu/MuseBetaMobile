import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { JourneyDeploymentScreen } from './../screens/journey/JourneyDeploymentScreen.js';

const Stack = createStackNavigator();

export const JourneyStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name='JourneyDeploymentScreen'
      component={JourneyDeploymentScreen}
    />
  </Stack.Navigator>
)