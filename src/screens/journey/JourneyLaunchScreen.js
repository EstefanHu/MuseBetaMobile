import React, { useState, useEffect, useContext } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Permissions,
  Linking
} from 'react-native';
import { Context as JourneyContext } from './../../providers/JourneyProvider.js';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export const JourneyLaunchScreen = () => {
  const { state: { status }, fetchJourney } = useContext(JourneyContext);

  useEffect(() => {

  }, []);

  return (
    <View style={styles.container}>
      <Text>Launch</Text>
    </View>
  );
};