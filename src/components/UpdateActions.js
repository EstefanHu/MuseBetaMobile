import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import { Context as ProfileContext } from './../providers/ProfileProvider.js';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  actionButton: {
    flexGrow: 1,
    paddingTop: 30,
  },
  actionText: {
    fontSize: 19,
    color: 'rgb(255,50,50)',
    textAlign: 'center',
  }
});

export const UpdateActions = ({ body, navigation }) => {
  const { updateProfile } = React.useContext(ProfileContext);

  const submitUpdate = () => {
    updateProfile(body);
    navigation.pop();
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.wrapper} edges={['bottom']}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.pop()}
        >
          <Text style={styles.actionText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={submitUpdate}
        >
          <Text style={styles.actionText}>Update</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
};