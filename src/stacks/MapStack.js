import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { MapHomeScreen } from '../screens/MapHomeScreen';

const Stack = createStackNavigator();

export const MapStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name='MapHomeScreen'
      component={MapHomeScreen}
    />
  </Stack.Navigator>
)