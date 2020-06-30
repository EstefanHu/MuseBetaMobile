import React, { useContext } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
} from 'react-native';
import { Context as AuthContext } from '../providers/AuthProvider.js';

export const ProfileHomeScreen = () => {
  const { signout } = useContext(AuthContext);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Acount Screen</Text>
      <Button title='logout' onPress={signout} />
    </View>
  )
}

const styles = StyleSheet.create({});