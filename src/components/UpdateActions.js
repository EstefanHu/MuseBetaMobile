import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Context as ProfileContext } from './../providers/ProfileProvider.js';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingVertical: 20,
  },
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  actionButton: {},
  actionText: {
    fontSize: 19,
    color: 'rgb(255,50,50)'
  }
});

export const UpdateActions = ({ body }) => {
  const navigation = useNavigation();
  const { updateProfile } = React.useContext(ProfileContext);

  const submitUpdate = () => {
    updateProfile(body);
    navigation.pop();
  };

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={styles.wrapper}>
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
        </View>
      </SafeAreaView>
    </View>
  );
};