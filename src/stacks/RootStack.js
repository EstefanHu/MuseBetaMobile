import React, { useEffect, useContext } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import decode from 'jwt-decode';

import { Context as AuthContext } from './../providers/AuthProvider.js';
import { Context as ProfileContext } from './../providers/ProfileProvider.js';

import { WelcomeStack } from './WelcomeStack.js';
import { BottomTabs } from './../layout/BottomTabs.js';
import { CreateStoryModal } from './../layout/CreateStoryModal.js';
import { ProfileOverviewModal } from './../layout/ProfileOverviewModal.js';

import {
  MaterialCommunityIcons
} from '@expo/vector-icons';
import {HeaderActions} from './../components/HeaderActions.js';
import { Logo } from './../components/Logo.js';
import { BackHeader } from '../components/BackHeader.js';

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
        options={{
          animationEnabled: true,
          header: () => null
        }}
      />
      <Stack.Screen
        name='ProfileOverviewModal'
        component={ProfileOverviewModal}
        options={({ navigation }) => ({
          animationEnabled: true,
          headerLeft: () => <BackHeader navigation={navigation} />,
          headerTitle: null,
          headerRight: () => <ProfileHeader navigation={navigation} />
        })}
      />
    </Stack.Navigator>
  )
};

const leftHeaderStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  icon: {
    // marginRight: 10,
  }
});

const ProfileHeader = ({ navigation }) => {
  return (
    <View style={leftHeaderStyles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate('SettingsModal')}>
        <MaterialCommunityIcons
          style={leftHeaderStyles.icon}
          name='dots-vertical'
          size={22}
          color='grey'
        />
      </TouchableOpacity>
    </View>
  )
}