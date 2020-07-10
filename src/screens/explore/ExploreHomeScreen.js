import React, { useState, useContext } from 'react';
import MapView, { Marker, Callout } from 'react-native-maps';
import {
  StyleSheet,
  View,
  Dimensions,
} from 'react-native';
import { Foundation } from '@expo/vector-icons';

import { Context as LocationContext } from './../../providers/LocationProvider.js';
import { Context as StoryContext } from './../../providers/StoryProvider.js';

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
  },
  callout: {
    justifyContent: 'center',
    alignItems: 'center',
    transform: [
      { translateX: 9 },
      { translateY: 15 }
    ]
  }
});

export const ExploreHomeScreen = ({ navigation }) => {
  const { state: { longitude } } = useContext(LocationContext);

  return (
    <View style={styles.container}>
      {longitude && <Map navigation={navigation} />}
    </View>
  )
}

const Map = ({ navigation }) => {
  const { state: { longitude, latitude } } = useContext(LocationContext);
  const { state: { stories } } = useContext(StoryContext);
  const [region, setRegion] = useState({
    longitude: longitude,
    latitude: latitude,
    longitudeDelta: 0.1,
    latitudeDelta: 0.1
  });

  return (
    <MapView
      style={styles.mapStyle}
      initialRegion={region}
      onRegionChange={setRegion}
      showsUserLocation
    >
      {
        stories.map(item => (
          <Marker
            key={item._id}
            coordinate={{
              latitude: item.startLocation.coordinates[1],
              longitude: item.startLocation.coordinates[0]
            }}
            onPress={() => navigation.navigate('ExploreStoryModal', { id: item._id })}
          >
            <Callout tooltip>
              <View style={styles.callout}>
                <Foundation name='arrow-down' size={35} color='black' />
              </View>
            </Callout>
          </Marker>
        ))
      }
    </MapView>
  )
}