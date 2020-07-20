import React, { useContext } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {
  MaterialIcons,
  Feather
} from '@expo/vector-icons';

import { Context as NearContext } from '../../providers/NearProvider.js';
import { Context as LocationContext } from '../../providers/LocationProvider.js';

import { Map } from '../../components/Map.js';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: '100%',
  },
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

export const NearNavigationScreen = ({ route, navigation }) => {
  const mapRef = React.useRef(null);
  const { state: { story } } = useContext(NearContext);
  const { state: { longitude, latitude } } = useContext(LocationContext);

  React.useEffect(() => {
    fitMarkers()
  }, [story, mapRef]);

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
    mapRef.current.fitToCoordinates(MARKERS, OPTIONS);
  }

  return (
    <View style={styles.container}>
      <Map
        navigation={navigation}
        mapRef={mapRef}
        // toggleBs={() => bs.current.snapTo(1)}
        stories={[story]}
        longitude={longitude}
        latitude={latitude}
      />
      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => null}
        >
          <Feather name='info' size={25} color='black' />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={fitMarkers}
        >
          <MaterialIcons name='crop-free' size={25} color='black' />
        </TouchableOpacity>
      </View>
    </View>
  );
};