import React, { useEffect, useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import decode from 'jwt-decode';

import { Context as AuthContext } from './../providers/AuthProvider.js';
import { Context as ProfileContext } from './../providers/ProfileProvider.js';

import { WelcomeStack } from './WelcomeStack.js';
import { BottomTabs } from './../layout/BottomTabs.js';
import { CreateStoryModal } from './../layout/CreateStoryModal.js';
import { ProfileOverviewModal } from './../layout/ProfileOverviewModal.js';

import { Logo } from './../components/Logo.js';
import { HeaderActions } from './../components/HeaderActions.js';

const Stack = createStackNavigator();

export const RootStack = () => {
  const { state: { token }, logout } = useContext(AuthContext);
  const { getMe } = useContext(ProfileContext);

  useEffect(() => {
    const expDate = decode(token);
    if (expDate.exp < new Date().getTime() / 1000)
      logout();

    getMe();
  }, []);

  return (
    <Stack.Navigator
      screenOptions={{ animationEnabled: false }}
      mode='modal'
    >
      <Stack.Screen
        name='BottomTabs'
        component={BottomTabs}
        options={({ navigation }) => ({
          headerLeft: () => <Logo />,
          headerTitle: null,
          headerRight: () => <HeaderActions navigation={navigation} />
        })}
      />
      <Stack.Screen
        name='CreateStoryModal'
        component={CreateStoryModal}
        options={{ animationEnabled: true }}
      />
      <Stack.Screen
        name='ProfileOverviewModal'
        component={ProfileOverviewModal}
        options={{ animationEnabled: true }}
      />
    </Stack.Navigator>
  )
};