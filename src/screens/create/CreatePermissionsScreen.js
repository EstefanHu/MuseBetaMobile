import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Linking
} from 'react-native';
import * as Permissions from 'expo-permissions';
import { Entypo } from '@expo/vector-icons';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(40,40,40)'
  },
  iconWrapper: {
    backgroundColor: 'grey',
    height: 270,
    width: 270,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 150,
    paddingTop: 15,
    marginBottom: 40
  },
  header: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15
  },
  info: {
    color: 'white',
    marginBottom: 30,
    fontSize: 18,
  },
  getStarted: {
    backgroundColor: 'rgb(255,50,50)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 3,
  },
  getStartedText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'rgb(40,40,40)',
    textTransform: 'uppercase'
  }
});

export const CreatePermissionsScreen = () => {
  const [hasDenied, setHasDenied] = useState(false);

  const askPermissions = () => console.log('hello');

  return (
    <View style={styles.container}>
      <View style={styles.iconWrapper}>
        <Entypo name='open-book' size={200} color='lightgrey' />
      </View>
      <Text style={styles.header}>Tell a story</Text>
      <Text style={styles.info}>To get started, allow access to Photos, Camera, and Microphone</Text>
      {
        hasDenied ?
          <TouchableOpacity
            style={styles.getStarted}
            onPress={() => Linking.openSettings()}
          >
            <Text style={styles.getStartedText}>Open settings</Text>
          </TouchableOpacity>
          : <TouchableOpacity
            style={styles.getStarted}
            onPress={askPermissions}>
            <Text style={styles.getStartedText}>Get Started!</Text>
          </TouchableOpacity>
      }
    </View>
  );
};