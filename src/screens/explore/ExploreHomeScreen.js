import React, { useState, useContext } from 'react';
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
import { MapActions } from '../../components/MapActions.js';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  header: {
    backgroundColor: 'white',
    shadowColor: '#333333',
    shadowOffset: { width: -1, height: -3 },
    shadowRadius: 2,
    shadowOpacity: 0.2,
    paddingTop: 5,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 6,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  panel: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
    height: '100%'
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
});

const PANNEL_HEADER_HEIGHT = 48;

export const ExploreHomeScreen = ({ navigation }) => {
  const { state: { headerHeight, bottomTabHeight } } = useContext(LayoutContext);
  const [topHeight, setTopHeight] = useState('100%');
  const [previewHeight, setPreviewHeight] = useState('50%');
  const [dockHeight, setDockheight] = useState(150);

  React.useEffect(() => {
    const dimensions = Dimensions.get('window').height;
    const height = dimensions - headerHeight - bottomTabHeight - PANNEL_HEADER_HEIGHT;
    setTopHeight(height);
    setPreviewHeight(bottomTabHeight + PANNEL_HEADER_HEIGHT);
    setDockheight(bottomTabHeight + PANNEL_HEADER_HEIGHT);
  }, []);

  const bs = React.createRef();
  const fall = new Animated.Value(1);

  const mapRef = React.useRef(null);



  const toggleBs = () => {
    if (bs.current !== 0) {
      bs.current.snapTo(2);
      setTimeout(() => {
        bs.current.snapTo(1);
      }, 500);
    } else {
      bs.current.snapTo(2);
    }
  }

  return (
    <View style={styles.container}>
      <Map
        navigation={navigation}
        bs={bs}
        mapRef={mapRef}
        toggleBs={toggleBs}
      />
      <MapActions mapRef={mapRef} />
      <BottomSheet
        ref={bs}
        snapPoints={[topHeight, previewHeight, dockHeight]}
        initialSnap={2}
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

const Map = ({ navigation, bs, mapRef, toggleBs }) => {
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