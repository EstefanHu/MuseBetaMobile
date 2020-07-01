import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { MapHomeScreen } from '../screens/MapHomeScreen';
import { MapStoryDetailScreen } from '../screens/MapStoryDetailScreen';

const Stack = createStackNavigator();

export const MapStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen
      name='MapHomeScreen'
      component={MapHomeScreen}
    />
    <Stack.Screen
      name='MapStoryDetailScreen'
      component={MapStoryDetailScreen}
    />
  </Stack.Navigator>
)