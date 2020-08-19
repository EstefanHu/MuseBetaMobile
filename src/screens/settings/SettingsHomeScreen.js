import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';

import { Context as AuthContext } from './../../providers/AuthProvider.js';

const styles = StyleSheet.create({
  container: {

  }
});

export const SettingsHomeScreen = () => {
  const { logout } = React.useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text>Hello From Settings</Text>
      <TouchableOpacity onPress={logout}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};