import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(40,40,40)'
  },
  getStarted: {
    backgroundColor: 'rgb(255,50,50)',
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  getStartedText: {
    fontSize: 24,
    fontWeight: 'bold',
  }
});

export const CreatePermissionsScreen = () => {
  const askPermissions = () => console.log('hello');

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.getStarted}
        onPress={() => askPermissions}>
        <Text style={styles.getStartedText}>Get Started!</Text>
      </TouchableOpacity>
    </View>
  );
};