import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { ProfileTopTabs } from './../layout/ProfileTopTabs.js';
import { ExploreHomeScreen } from './../screens/explore/ExploreHomeScreen.js';
import { MapInfoModal } from './../screens/explore/MapInfoModal.js';

const Stack = createStackNavigator();

export const ExploreStack = () => {
  return (
    <Stack.Navigator mode='modal'>
      <Stack.Screen
        name='ExploreHomeScreen'
        component={ExploreHomeScreen}
      />
      <Stack.Screen
        name='ProfileTopTabs'
        component={ProfileTopTabs}
      />
      <Stack.Screen
        name='MapInfoModal'
        component={MapInfoModal}
      />
    </Stack.Navigator>
  );
};