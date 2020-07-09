import React, { useContext } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';

import { Context as AuthContext } from './../../providers/AuthProvider.js';
import { Context as LocationContext } from './../../providers/LocationProvider.js';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgb(255,50,50)',
  },
  heroContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcome: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  hero: {
    fontSize: 26,
    fontWeight: 'bold',
    color: 'white',
  },
  next: {
    backgroundColor: 'white',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    width: 200,
    marginBottom: 50
  },
  nextText: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center'
  }
});

export const WelcomeLaunchScreen = ({ navigation }) => {
  const { finishTutorial } = useContext(AuthContext);
  const { state: { city } } = useContext(LocationContext);

  const toApplication = () => {
    finishTutorial();
    navigation.navigate('BottomTabs');
  }

  return (
    <View style={styles.container}>
      <View style={styles.heroContainer}>
        <Text style={styles.welcome}>Welcome to</Text>
        <Text style={styles.hero}>{city}'s</Text>
        <Text style={styles.welcome}>story</Text>
      </View>
      <TouchableOpacity onPress={toApplication}>
        <View style={styles.next}>
          <Text style={styles.nextText}>Agree</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}