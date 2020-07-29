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

import { Context as SearchContext } from './../providers/SearchProvider.js';
import { Context as LayoutContext } from './../providers/LayoutProvider.js';
import { Context as JourneyContext } from './../providers/JourneyProvider.js';

const styles = StyleSheet.create({
  mapStyle: {
    width: Dimensions.get('window').width,
    height: '100%',
  },
  callout: { //TODO: styles causeing misalignments
    justifyContent: 'center',
    alignItems: 'center',
    transform: [
      { translateX: 9 },
      { translateY: 15 }
    ]
  },
});

export const Map = ({ stories, longitude, latitude }) => {
  if (longitude === null)
    return <ActivityIndicator
      size='large'
      color='rgb(255,50,50)'
      style={{ flex: 1 }}
    />

  const { state: { storyId }, setStory, clearStory } = React.useContext(SearchContext);
  const { state: { mapRef, markers, initialBottomSheetRef, storyBottomSheetRef } } = React.useContext(LayoutContext);
  const { state: { journeyId, journeyStartLocation } } = React.useContext(JourneyContext);

  const [region, setRegion] = React.useState({
    longitude: longitude,
    latitude: latitude,
    longitudeDelta: 0.1,
    latitudeDelta: 0.1
  });

  const toggleBs = storyId => {
    setStory(storyId)
    initialBottomSheetRef.current.snapTo(2);
    storyBottomSheetRef.current.snapTo(1);
  }

  const closeStorySearch = e => {
    if (!storyId) return;

    clearStory();
    initialBottomSheetRef.current.snapTo(1);
    storyBottomSheetRef.current.snapTo(2)
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
      showsPointsOfInterest={false}
      onPress={closeStorySearch}
    >
      {journeyId ?
        <Marker
          coordinate={{
            latitude: journeyStartLocation?.coordinates[1],
            longitude: journeyStartLocation?.coordinates[0]
          }}
        />
        : stories.map(item => (
          <Marker
            key={item._id}
            ref={(ref) => markers[item._id] = ref}
            coordinate={{
              latitude: item.startLocation.coordinates[1],
              longitude: item.startLocation.coordinates[0]
            }}
            onPress={() => toggleBs(item._id)}
            stopPropagation
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