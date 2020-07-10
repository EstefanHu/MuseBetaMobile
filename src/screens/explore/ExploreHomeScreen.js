import React, { useState, useEffect, useContext, useRef } from 'react';
import MapView, { Marker, Callout } from 'react-native-maps';
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  Alert,
  Platform,
  TouchableOpacity
} from 'react-native';
import { Foundation } from '@expo/vector-icons';
import Animated, { reanimated } from 'react-native-reanimated';

import { Context as LocationContext } from './../../providers/LocationProvider.js';
import { Context as StoryContext } from './../../providers/StoryProvider.js';

import BottomSheet from 'reanimated-bottom-sheet';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    backgroundColor: 'white',
    shadowColor: '#333333',
    shadowOffset: { width: -1, height: -3 },
    shadowRadius: 2,
    shadowOpacity: 0.2,
    paddingTop: 20,
    borderTopEndRadius: 15,
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
  }
});

export const ExploreHomeScreen = ({ navigation }) => {
  const { state: { longitude } } = useContext(LocationContext);

  const bs = React.createRef();
  const fall = new Animated.Value(1);

  return (
    <View style={styles.container}>
      {longitude && <Map navigation={navigation} bs={bs} />}
      <BottomSheet
        ref={bs}
        snapPoints={[330, 0]}
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

const Map = ({ navigation, bs, setPaddingTop }) => {
  const initialRegion = useRef(region);
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
      region={region}
      // onRegionChange={console.log}
      onRegionChangeComplete={setRegion}
      mapType={"mutedStandard"}
      showsScale
      showsIndoors
      loadingEnabled
      compassOffset={{ x: -5, y: 5 }}
      showsUserLocation
      showsMyLocationButton
      onMapReady={() => console.log('hello')}
      onPoiClick={e => console.log(e.nativeEvent)}
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

      <TouchableOpacity>
        <Text>Recenter</Text>
      </TouchableOpacity>
    </MapView>
  )
}