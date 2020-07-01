import React from 'react';
import MapView, { Marker } from 'react-native-maps';
import {
  StyleSheet,
  View,
  FlatList,
  Dimensions
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  }
})

export const ExploreHomeScreen = () => {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapStyle}
        showsUserLocation
      >
      </MapView>
    </View>
  )
}