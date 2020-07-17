import React, { useState, useContext } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useFocusEffect } from '@react-navigation/native';

import { Context as JourneyContext } from './../../providers/JourneyProvider.js';
import { Context as LocationContext } from './../../providers/LocationProvider.js';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: '100%',
  },
});

export const JourneyLaunchScreen = ({ route, navigation }) => {
  const previewMap = React.useRef(null);
  const { state: { story }, fetchJourney } = useContext(JourneyContext);
  const { state: { longitude, latitude } } = useContext(LocationContext);
  const [region, setRegion] = useState({
    longitude: longitude,
    latitude: latitude,
    longitudeDelta: 0.1,
    latitudeDelta: 0.1
  });

  React.useEffect(() => {
    fitMarkers()
  }, [story, previewMap]);

  const fitMarkers = () => {
    const MARKERS = [
      {
        latitude: story.startLocation.coordinates[1],
        longitude: story.startLocation.coordinates[0]
      },
      { latitude: latitude, longitude: longitude }
    ]
    const OPTIONS = {
      edgePadding: {
        top: 80,
        right: 50,
        bottom: 50,
        left: 50
      }
    }
    previewMap.current.fitToCoordinates(MARKERS, OPTIONS);
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapStyle}
        ref={previewMap}
        region={region}
        onRegionChange={() => setRegion()}
        mapType={"mutedStandard"}
        showsScale
        showsIndoors
        loadingEnabled
        compassOffset={{ x: -5, y: 5 }}
        showsUserLocation
        showsMyLocationButton
      >
        <Marker
          coordinate={{
            latitude: story.startLocation.coordinates[1],
            longitude: story.startLocation.coordinates[0]
          }}
        >

        </Marker>
      </MapView>
    </View>
  );
};