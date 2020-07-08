import React, { useState, useEffect, useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import * as Location from 'expo-location';

import { Context as LocationContext } from './../providers/LocationProvider.js';
import { ExploreHomeScreen } from './../screens/explore/ExploreHomeScreen';
import { ExploreStoryScreen } from './../screens/explore/ExploreStoryScreen';

const Stack = createStackNavigator();

export const ExploreStack = () => {
  const { state: { status }, setStatus, getLocation } = useContext(LocationContext);

  // useEffect(() => {
  //   (async () => {
  //     let { status } = await Location.requestPermissionsAsync();
  //     if (status !== 'granted') 
  //   })();
  // });

  useEffect(() => {
    const requestLocation = async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') return setStatus('denied');

      let location = await Location.getCurrentPositionAsync({});
      setStatus()
    }
    if (status === 'pending') requestLocation();
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