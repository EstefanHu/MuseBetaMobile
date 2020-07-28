import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {
  Feather,
  MaterialIcons,
} from '@expo/vector-icons';

import Animated from 'react-native-reanimated';

import { Context as LocationContext } from './../../providers/LocationProvider.js';
import { Context as StoryContext } from './../../providers/StoryProvider.js';
import { Context as LayoutContext } from './../../providers/LayoutProvider.js';

import { Map } from './../../components/Map.js';
import { InitialBottomSheet } from './InitialBottomSheet.js';
import { SearchBottomSheet } from './SearchBottomSheet.js';
import { StoryBottomSheet } from './StoryBottomSheet.js';

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

export const ExploreHomeScreen = () => {
  const { state: { stories } } = React.useContext(StoryContext);
  const { state: { longitude, latitude } } = React.useContext(LocationContext);
  const {
    state: {
      deviceHeight,
      deviceWidth,
      headerHeight,
      topInset,
      bottomInset,
      bottomSheetHeaderHeight
    },
    setBottomSheetHeight,
    setMapRef,
    setInputRef,
    setInitialBottomSheetRef,
    setSearchBottomSheetRef,
    setStoryBottomSheetRef,
    setNavigationBottomSheetRef,
  } = React.useContext(LayoutContext);

  React.useEffect(() => {
    setBottomSheetHeight(
      deviceHeight, headerHeight,
      topInset, bottomInset,
      bottomSheetHeaderHeight);
  }, [
    deviceHeight, headerHeight, topInset,
    bottomInset, bottomSheetHeaderHeight
  ]);

  const mapRef = React.useRef(null);
  const inputRef = React.useRef(null);
  const initialBS = React.useRef(null);
  const storyBS = React.useRef(null);
  const searchBS = React.useRef(null);
  const navigationBS = React.useRef(null);
  React.useEffect(() => {
    setMapRef(mapRef);
    setInputRef(inputRef)
    setInitialBottomSheetRef(initialBS);
    setSearchBottomSheetRef(searchBS);
    setStoryBottomSheetRef(storyBS);
    setNavigationBottomSheetRef(navigationBS);
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


  return (
    <KeyboardAvoidingView
      behavior={'height'}
      enabled={Platform.OS == 'ios' ? false : true}
      style={styles.container}
    >
      <View style={[styles.container, { width: deviceWidth }]}>
        <Map
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

        <InitialBottomSheet stories={stories} />
        <SearchBottomSheet />
        <StoryBottomSheet />
      </View>
    </KeyboardAvoidingView>
  );
};