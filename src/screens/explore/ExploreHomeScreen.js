import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import {
  Feather,
  MaterialIcons,
} from '@expo/vector-icons';

import Animated from 'react-native-reanimated';

import { Context as LocationContext } from './../../providers/LocationProvider.js';
import { Context as StoryContext } from './../../providers/StoryProvider.js';

import { Map } from './../../components/Map.js';
import { InitialBottomSheet } from './InitialBottomSheet.js';
import { SearchBottomSheet } from './SearchBottomSheet.js';

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
});

export const ExploreHomeScreen = ({ navigation }) => {
  const { state: { stories } } = React.useContext(StoryContext);
  const { state: { longitude, latitude } } = React.useContext(LocationContext);

  const [isSearching, setIsSearching] = React.useState(false);
  const [searchBSIsActive, setSearchBSIsActive] = React.useState(false);
  const [search, setSearch] = React.useState('');

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
  const initialBS = React.useRef(null);
  const searchBS = React.useRef(null);
  const fall = new Animated.Value(1);

  const mapRef = React.useRef(null);
  const inputRef = React.useRef(null);

  const cancelSearch = (idx) => {
    inputRef.current.blur();
    setIsSearching(false);
    initialBS.current.snapTo(idx);
    Keyboard.dismiss();
  };

  return (
    <View style={styles.container}>
      <Map
        navigation={navigation}
        bs={initialBS}
        mapRef={mapRef}
        toggleBs={() => initialBS.current.snapTo(1)}
        stories={stories}
        longitude={longitude}
        latitude={latitude}
      />

      <Animated.View style={[styles.actions, { opacity: 1 }]}>
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
      </Animated.View>

      <InitialBottomSheet
        navigation={navigation}
        initialBS={initialBS}
        searchBS={searchBS}
        fall={fall}
        search={search}
        setSearch={setSearch}
        isSearching={isSearching}
        setIsSearching={setIsSearching}
        cancelSearch={cancelSearch}
        inputRef={inputRef}
        stories={stories}
        setSearchBSIsActive={setSearchBSIsActive}
      />
      <SearchBottomSheet
        searchBS={searchBS}
        isActive={searchBSIsActive}
        setIsActive={setSearchBSIsActive}
      />
    </View>
  );
};