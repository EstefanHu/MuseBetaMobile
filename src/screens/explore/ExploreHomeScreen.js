import React, { useState, useContext } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  TouchableOpacity,
} from 'react-native';
import {
  Feather,
  MaterialIcons,
} from '@expo/vector-icons';

import Animated from 'react-native-reanimated';

import { Context as LocationContext } from './../../providers/LocationProvider.js';
import { Context as StoryContext } from './../../providers/StoryProvider.js';
import { Context as LayoutContext } from './../../providers/LayoutProvider.js';

import BottomSheet from 'reanimated-bottom-sheet';
import { Map } from './../../components/Map.js';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
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

});

const PANNEL_HEADER_HEIGHT = 48;

export const ExploreHomeScreen = ({ navigation }) => {
  const { state: { stories } } = useContext(StoryContext);
  const { state: { longitude, latitude } } = React.useContext(LocationContext);
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
        stories={stories}
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
          onPress={recenter}
        >
          <MaterialIcons name='crop-free' size={25} color='black' />
        </TouchableOpacity>
      </View>
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