import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ExploreHomeScreen } from './../screens/explore/ExploreHomeScreen';
import { ExploreStoryScreen } from './../screens/explore/ExploreStoryScreen';

const Stack = createStackNavigator();

export const ExploreStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name='ExploreHomeScreen'
      component={ExploreHomeScreen}
    />
    <Stack.Screen
      name='ExploreStoryScreen'
      component={ExploreStoryScreen}
    />
  </Stack.Navigator>
)