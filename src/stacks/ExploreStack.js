import React, { useState, useEffect, useContext } from 'react';
import { Linking } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

import { Context as LocationContext } from './../providers/LocationProvider.js';
import { ExploreHomeScreen } from './../screens/explore/ExploreHomeScreen';
import { ExploreStoryScreen } from './../screens/explore/ExploreStoryScreen';

const Stack = createStackNavigator();

export const ExploreStack = () => {
  const { state: { status }, setStatus, setCoords } = useContext(LocationContext);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      console.log(status);
      if (status === 'denied') Linking.openURL('app-settings:');

      let location = await Location.getCurrentPositionAsync({});
      console.log(location);
      setCoords(location);
    })();
  }, []);

  return (
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
}