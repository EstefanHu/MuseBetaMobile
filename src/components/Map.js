import React from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  ActivityIndicator
} from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { Foundation } from '@expo/vector-icons';

const styles = StyleSheet.create({
  mapStyle: {
    width: Dimensions.get('window').width,
    height: '100%',
  },
  callout: {
    justifyContent: 'center',
    alignItems: 'center',
    transform: [
      { translateX: 9 },
      { translateY: 15 }
    ]
  },
});

export const Map = ({ bs, mapRef, stories, longitude, latitude }) => {
  if (longitude === null)
    return <ActivityIndicator
      size='large'
      color='rgb(255,50,50)'
      style={{ flex: 1 }}
    />

  const [region, setRegion] = React.useState({
    longitude: longitude,
    latitude: latitude,
    longitudeDelta: 0.1,
    latitudeDelta: 0.1
  });

  const toggleBs = () => {
    bs.current.snapTo(1);
  }

  return (
    <MapView
      style={styles.mapStyle}
      ref={mapRef}
      region={region}
      onRegionChange={() => setRegion()}
      mapType={"mutedStandard"}
      pitchEnabled
      rotateEnabled
      showsScale
      compassOffset={{ x: -6, y: 105 }}
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
            onPress={toggleBs}
            tracksViewChanges={false}
          >
            <Callout tooltip alphaHitTest={true}>
              <View style={styles.callout}>
                <Foundation name='arrow-down' size={35} color='black' />
              </View>
            </Callout>
          </Marker>
        ))
      }
    </MapView >
  );
};