import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ExploreHomeScreen } from '../screens/ExploreHomeScreen';
import { ExploreStoryScreen } from '../screens/ExploreStoryScreen';

const Stack = createStackNavigator();

export const ExploreStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
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