import React, { useState, useEffect, useContext } from 'react';
import { Linking, Alert } from 'react-native';
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
      let { status } = await Permissions.getAsync(Permissions.LOCATION);
      if (status === 'granted') {
        let location = await Location.getCurrentPositionAsync({});
        setCoords(location);
      } else {
        Alert.alert(
          'Grant Location',
          'Permission is required for :Muse explore feature',
          [
            {
              text: 'Later',
              style: 'cancel'
            },
            {
              text: 'Settings',
              onPress: () => Linking.openSettings(),
            }
          ],
          { cancelable: false }
        )
      }
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