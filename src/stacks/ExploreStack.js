import React, { useEffect, useContext } from 'react';
import { Linking, Alert } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

import { Context as LocationContext } from './../providers/LocationProvider.js';
import { ExploreHomeScreen } from './../screens/explore/ExploreHomeScreen';

const Stack = createStackNavigator();

export const ExploreStack = () => {
  const { setCoords } = useContext(LocationContext);

  useEffect(() => {
    (async () => {
      let { status } = await Permissions.askAsync(Permissions.LOCATION);
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
    <Stack.Navigator mode='modal'>
      <Stack.Screen
        name='ExploreHomeScreen'
        component={ExploreHomeScreen}
      />
    </Stack.Navigator>
  );
};