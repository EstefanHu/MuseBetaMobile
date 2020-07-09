import React, { useEffect, useContext } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView
} from 'react-native';

import { Context as LocationContext } from './../../providers/LocationProvider.js';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgb(255,50,50)',
  },
  next: {
    backgroundColor: 'white',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    width: 200,
  },
  nextText: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center'
  }
});

export const WelcomeLocationScreen = ({ navigation }) => {
  const { setCoords } = useContext(LocationContext);

  return (
    <SafeAreaView style={styles.contiainer}>
      <TouchableOpacity onPress={() => navigation.navigate('WelcomeImageScreen')}>
        <View style={styles.next}>
          <Text style={styles.nextText}>Next</Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};