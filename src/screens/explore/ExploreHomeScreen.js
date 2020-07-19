import React, { useState, useEffect, useContext } from 'react';
import MapView, { Marker, Callout } from 'react-native-maps';
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  TouchableOpacity,
} from 'react-native';
import {
  Foundation,
  MaterialIcons,
  Feather
} from '@expo/vector-icons';
import Animated from 'react-native-reanimated';

import { Context as LocationContext } from './../../providers/LocationProvider.js';
import { Context as StoryContext } from './../../providers/StoryProvider.js';
import { Context as LayoutContext } from './../../providers/LayoutProvider.js';

import BottomSheet from 'reanimated-bottom-sheet';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  header: {
    backgroundColor: 'white',
    shadowColor: '#333333',
    shadowOffset: { width: -1, height: -3 },
    shadowRadius: 2,
    shadowOpacity: 0.2,
    paddingTop: 20,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  panel: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
  },
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
  actions: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: Dimensions.get('window').width,
    position: 'absolute',
    paddingBottom: 10,
  },
  actionButton: {
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 10,
    marginHorizontal: 5,
  },
});

export const ExploreHomeScreen = ({ navigation }) => {
  const { state: { longitude, latitude } } = useContext(LocationContext);
  const { state: { headerHeight, bottomTabHeight } } = useContext(LayoutContext);
  const [topHeight, setTopHeight] = useState('100%');

  useEffect(() => {
    const dimensions = Dimensions.get('window').height;
    console.log(headerHeight)
    const height = dimensions - headerHeight - (+bottomTabHeight) - 48; // 48 is size of pannel 34 is inset
    setTopHeight(height);
  }, []);

  const bs = React.createRef();
  const fall = new Animated.Value(1);

  const mapRef = React.useRef(null);

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
    <View style={styles.container}>
      {
        longitude &&
        <Map
          navigation={navigation}
          bs={bs}
          mapRef={mapRef}
        />
      }
      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={recenter}
        >
          <MaterialIcons name='crop-free' size={25} color='black' />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => null}
        >
          <Feather name='navigation' size={25} color='black' />
        </TouchableOpacity>
      </View>
      <BottomSheet
        ref={bs}
        snapPoints={[topHeight, 0]}
        initialSnap={1}
        callbackNode={fall}
        enabledBottomInitialAnimation={true}
        renderContent={() => <Text style={styles.panel}>Hello World</Text>}
        renderHeader={
          () => <View style={styles.header}>
            <View style={styles.panelHeader}>
              <View style={styles.panelHandle}></View>
            </View>
          </View>
        }
      />
    </View>
  );
};

const Map = ({ navigation, bs, mapRef }) => {
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
      ref={mapRef}
      region={region}
      onRegionChange={() => setRegion()}
      mapType={"mutedStandard"}
      pitchEnabled
      rotateEnabled
      showsScale
      loadingEnabled
      compassOffset={{ x: -5, y: 5 }}
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
            onPress={() => bs.current.snapTo(0)}
            tracksViewChanges={false}
            onMapReady={() => console.log('hello')}
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