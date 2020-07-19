import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';
import { Feather, MaterialIcons } from '@expo/vector-icons';

import { Context as LocationContext } from './../providers/LocationProvider.js';

const styles = StyleSheet.create({
  actions: {
    position: 'absolute',
    right: 7,
    top: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 9,
    paddingVertical: 5,
  },
  actionButton: {
    paddingVertical: 5,
  },
});

export const MapActions = ({ mapRef }) => {
  const { state: { longitude, latitude } } = React.useContext(LocationContext);

  const recenter = () => {
    mapRef.current.animateToRegion(
      {
        longitude,
        latitude,
        longitudeDelta: 0.1,
        latitudeDelta: 0.1
      },
      1000
    );
  }

  return (
    <View style={styles.actions}>
      <TouchableOpacity
        style={styles.actionButton}
        onPress={() => null}
      >
        <Feather name='info' size={25} color='black' />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.actionButton}
        onPress={recenter}
      >
        <MaterialIcons name='crop-free' size={25} color='black' />
      </TouchableOpacity>
    </View>
  );
};