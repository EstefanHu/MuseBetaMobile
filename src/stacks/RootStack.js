import React, { useEffect, useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import decode from 'jwt-decode';

import { Context as AuthContext } from './../providers/AuthProvider.js';
import { Context as ProfileContext } from './../providers/ProfileProvider.js';

import { BottomTabs } from './../layout/BottomTabs.js';

import { WelcomeStack } from './WelcomeStack.js';

import { HeaderActions } from './../components/HeaderActions.js';
import { Logo } from './../components/Logo.js';

import { StoryCardModal } from './../modals/StoryCardModal.js';
import { ReportModal } from './../modals/ReportModal.js';
import { CreateStoryModal } from '../modals/CreateStoryModal.js';
import { MetaModal } from './../modals/MetaModal.js'
import { UpdateNameModal } from './../modals/UpdateNameModal.js';
import { UpdatePasswordModal } from './../modals/UpdatePasswordModal.js';

const Stack = createStackNavigator();

export const RootStack = () => {
  const { state: { token, isNew }, logout } = useContext(AuthContext);
  const { getMe } = useContext(ProfileContext);

  useEffect(() => {
    const expDate = decode(token);
    if (expDate.exp < new Date().getTime() / 1000)
      logout();

    getMe();
  }, []);

  return (
    <Stack.Navigator
      initialRouteName={isNew ? 'WelcomeStack' : 'BottomTabs'}
      screenOptions={{ animationEnabled: false }}
      mode='modal'
    >
      <Stack.Screen
        name='WelcomeStack'
        component={WelcomeStack}
        options={{
          header: () => null
        }}
      />
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
        name='StoryCardModal'
        component={StoryCardModal}
        options={{
          animationEnabled: true,
          header: () => null,
          cardStyle: { backgroundColor: 'rgba(0, 0, 0, 0.15)' },
          cardOverlayEnabled: true,

          cardStyleInterpolator: ({ current: { progress } }) => {
            return {
              cardStyle: {
                opacity: progress.interpolate({
                  inputRange: [0, 0.5, 0.9, 1],
                  outputRange: [0, 0.25, 0.7, 1]
                })
              },
              overlayStyle: {
                opacity: progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 0.5],
                  extrapolate: 'clamp',
                })
              }
            };
          }
        }}
      />
      <Stack.Screen
        name='ReportModal'
        component={ReportModal}
        options={({ navigation }) => ({
          animationEnabled: true,
          headerTitle: null
        })}
      />
      <Stack.Screen
        name='CreateStoryModal'
        component={CreateStoryModal}
        options={{
          animationEnabled: true,
          header: () => null
        }}
      />
      <Stack.Screen
        name='MetaModal'
        component={MetaModal}
        options={{
          animationEnabled: true,
          header: () => null
        }}
      />
      <Stack.Screen
        name='UpdateNameModal'
        component={UpdateNameModal}
        options={{ animationEnabled: true }}
      />
      <Stack.Screen
        name='UpdatePasswordModal'
        component={UpdatePasswordModal}
        options={{ animationEnabled: true }}
      />
    </Stack.Navigator>
  )
};