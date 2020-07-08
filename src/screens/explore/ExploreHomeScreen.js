import React, { useState, useEffect, useContext } from 'react';
import MapView, { Marker } from 'react-native-maps';
import {
  StyleSheet,
  View,
  FlatList,
  Dimensions
} from 'react-native';
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
  }
});

export const ExploreHomeScreen = () => {
  const { state: { longitude, latitude } } = useContext(LocationContext);
  const { state: { stories } } = useContext(StoryContext);
  const [region, setRegion] = useState({
    longitude: longitude,
    latitude: latitude,
    longitudeDelta: 0.1,
    latitudeDelta: 0.1
  });

  console.log(longitude,latitude)

  // useEffect(() => {
  //   console.log('recalculating');
  // }, [longitude, latitude]);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapStyle}
        initialRegion={region}
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
              title={item.title}
            />
          ))
        }
      </MapView>
    </View>
  )
}