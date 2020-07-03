import React, { useContext } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
} from 'react-native';
import { Context as AuthContext } from '../providers/AuthProvider.js';
import { Context as ProfileContext } from './../providers/ProfileProvider.js';

export const ProfileHomeScreen = () => {
  const { logout } = useContext(AuthContext);
  const { state: { name } } = useContext(ProfileContext);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Acount Screen</Text>
      <Text>{name}</Text>
      <Button title='logout' onPress={logout} />
    </View>
  )
}

const styles = StyleSheet.create({});