import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { NewsHomeScreen } from './../screens/NewsHomeScreen.js';

import { Logo } from './../components/Logo.js';
import { HeaderActions } from '../components/HeaderActions.js';

const Stack = createStackNavigator();

export const NewsStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name='NewsHomeScreen'
      component={NewsHomeScreen}
      options={({ navigation }) => ({
        headerLeft: () => <Logo />,
        headerTitle: null,
        headerRight: () => <HeaderActions navigation={navigation} />
      })}
    />
  </Stack.Navigator>
)