import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import { Entypo } from '@expo/vector-icons';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(40,40,40)'
  },
  info: {
    color: 'white'
  },
  getStarted: {
    backgroundColor: 'rgb(255,50,50)',
    width: 200,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    borderRadius: 5,
  },
  getStartedText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  }
});

export const CreatePermissionsScreen = () => {
  const askPermissions = () => console.log('hello');

  return (
    <View style={styles.container}>
      <Entypo name='book' size={200} color='lightgrey' />
      <Text style={styles.header}>Tell a story</Text>
      <Text style={styles.info}></Text>
      <TouchableOpacity
        style={styles.getStarted}
        onPress={askPermissions}>
        <Text style={styles.getStartedText}>Get Started!</Text>
      </TouchableOpacity>
    </View>
  );
};