import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ExploreHomeScreen } from '../screens/ExploreHomeScreen';
import { ExploreStoryScreen } from '../screens/ExploreStoryScreen';

import { Logo } from './../components/Logo.js';
import { HeaderActions } from '../components/HeaderActions.js';

const Stack = createStackNavigator();

export const ExploreStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name='ExploreHomeScreen'
      options={({ navigation }) => ({
        headerLeft: () => <Logo />,
        headerTitle: null,
        headerRight: () => <HeaderActions navigation={navigation} />
      })}
      component={ExploreHomeScreen}
    />
    <Stack.Screen
      name='ExploreStoryScreen'
      component={ExploreStoryScreen}
    />
  </Stack.Navigator>
)