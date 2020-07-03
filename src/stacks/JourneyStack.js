import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { JourneyDeploymentScreen } from './../screens/JourneyDeploymentScreen.js';

import { Logo } from './../components/Logo.js';
import { HeaderActions } from '../components/HeaderActions.js';

const Stack = createStackNavigator();

export const JourneyStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name='JourneyDeploymentScreen'
      component={JourneyDeploymentScreen}
      options={({ navigation }) => ({
        headerLeft: () => <Logo />,
        headerTitle: null,
        headerRight: () => <HeaderActions navigation={navigation} />
      })}
    />
  </Stack.Navigator>
)