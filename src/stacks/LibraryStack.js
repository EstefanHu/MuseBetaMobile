import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { LibraryListScreen } from '../screens/LibraryListScreen.js';

import { Logo } from './../components/Logo.js';
import { HeaderActions } from '../components/HeaderActions.js';

const Stack = createStackNavigator();

export const LibraryStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name='LibraryListScreen'
      component={LibraryListScreen}
      options={({ navigation }) => ({
        headerLeft: () => <Logo />,
        headerTitle: null,
        headerRight: () => <HeaderActions navigation={navigation} />
      })}
      initialParams={{ channel: 'All' }}
    />
  </Stack.Navigator>
);