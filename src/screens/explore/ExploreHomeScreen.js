import React from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {
  Feather,
  MaterialIcons,
} from '@expo/vector-icons';

import Animated from 'react-native-reanimated';

import { Context as LocationContext } from './../../providers/LocationProvider.js';
import { Context as StoryContext } from './../../providers/StoryProvider.js';
import { Context as ProfileContext } from '../../providers/ProfileProvider.js'; // TODO: Temp
import { Context as LayoutContext } from './../../providers/LayoutProvider.js';

import BottomSheet from 'reanimated-bottom-sheet';
import { Map } from './../../components/Map.js';
import { StoryPreview } from '../../components/StoryPreview.js';

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

const PANNEL_HEADER_HEIGHT = 30;

export const ExploreHomeScreen = ({ navigation }) => {
  const { state: { stories }, fetchNearStories } = React.useContext(StoryContext);
  const { state: { library }, fetchLibrary } = React.useContext(ProfileContext);
  const { state: { longitude, latitude }, getCoords } = React.useContext(LocationContext);
  const { state: { headerHeight, topInset, bottomInset } } = React.useContext(LayoutContext);

  const [isSearching, setIsSearching] = React.useState(false);
  const [search, setSearch] = React.useState('');

  React.useEffect(() => {
    fetchLibrary();
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
  const bs = React.useRef(null);
  const fall = new Animated.Value(2);

  const mapRef = React.useRef(null);
  const inputRef = React.useRef(null);

  const cancelSearch = (idx) => {
    inputRef.current.blur();
    setIsSearching(false);
    bs.current.snapTo(idx);
    Keyboard.dismiss();
  };

  return (
    <View style={styles.container}>
      <Map
        navigation={navigation}
        bs={bs}
        mapRef={mapRef}
        toggleBs={() => bs.current.snapTo(1)}
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

      <BottomSheet
        ref={bs}
        snapPoints={[
          Dimensions.get('window').height - headerHeight
          - topInset - bottomInset - PANNEL_HEADER_HEIGHT,
          Dimensions.get('window').height / 2 - headerHeight
          - topInset - bottomInset - PANNEL_HEADER_HEIGHT,
          bottomInset + PANNEL_HEADER_HEIGHT
        ]}
        initialSnap={2}
        callbackNode={fall}
        enabledBottomInitialAnimation={false}
        enabledBottomClamp={true}
        onCloseStart={() => cancelSearch(1)}
        onCloseEnd={() => cancelSearch(2)}
        renderHeader={
          () =>
            <BottomSheetHeader
              search={search}
              setSearch={setSearch}
              isSearching={isSearching}
              setIsSearching={setIsSearching}
              bs={bs}
              inputRef={inputRef}
              cancelSearch={cancelSearch}
            />
        }
        renderContent={
          () =>
            <BottomSheetBody
              navigation={navigation}
              search={search}
              stories={stories}
              library={library}
            />
        }
      />
    </View>
  );
};

const bsStyles = StyleSheet.create({
  header: {
    backgroundColor: 'rgba(255,255,255,0.8)',
    shadowColor: '#333333',
    shadowOffset: { width: -1, height: -3 },
    shadowRadius: 2,
    shadowOpacity: 0.2,
    paddingVertical: 5,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    paddingHorizontal: 20,
    alignItems: 'center'
  },
  panelHandle: {
    width: 40,
    height: 6,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 6,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  searchInputContainer: {
    backgroundColor: 'rgba(200,200,200,0.4)',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 6,
    flexDirection: 'row',
    flex: 1,
  },
  searchInput: {
    paddingHorizontal: 5,
    flex: 1,
  },
  cancelSearch: {
    color: 'rgba(0,100,255,0.7)',
    marginLeft: 10,
    fontSize: 16
  }
});

const BottomSheetHeader = ({ search, setSearch, bs,
  isSearching, setIsSearching, inputRef, cancelSearch }) => {
  const startSearch = () => {
    inputRef.current.focus();
    setIsSearching(true);
    bs.current.snapTo(0);
  }

  return (
    <View style={bsStyles.header}>
      <View style={bsStyles.panelHeader}>
        <View style={bsStyles.panelHandle}></View>
      </View>
      <View style={bsStyles.searchContainer}>
        <TouchableWithoutFeedback onPress={startSearch}>
          <View style={bsStyles.searchInputContainer}>
            <MaterialIcons name='search' size={22} color='grey' />
            <TextInput
              ref={inputRef}
              style={bsStyles.searchInput}
              underlineColorAndroid='rgba(0,0,0,0)'
              placeholder="Search"
              onSubmitEditing={() => console.log('testing')}
              value={search}
              onChangeText={text => setSearch(text)}
              onFocus={startSearch}
              clearButtonMode={'always'}
            />
          </View>
        </TouchableWithoutFeedback>
        {
          isSearching && <TouchableOpacity onPress={() => cancelSearch(1)}>
            <Text style={bsStyles.cancelSearch}>Cancel</Text>
          </TouchableOpacity>
        }
      </View>
    </View >
  );
};

const bsbStyles = StyleSheet.create({
  panel: {
    paddingHorizontal: 20,
    backgroundColor: 'rgba(255,255,255,0.8)',
    paddingTop: 10,
    height: '100%'
  },
  section: {
    marginBottom: 30
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(200,200,200,0.8)',
    paddingBottom: 5,
  },
  sectionLable: {
    color: 'grey',
    fontSize: 13
  },
  more: {
    color: 'rgba(0, 100, 255, 0.7)',
    fontSize: 13
  },
});

const BottomSheetBody = ({ navigation, search, stories, library }) => {

  return (
    <View style={bsbStyles.panel}>
      <View style={bsbStyles.section}>
        <View style={bsbStyles.sectionHeader}>
          <Text style={bsbStyles.sectionLable}>Docked Story</Text>
        </View>
      </View>

      <View style={bsbStyles.section}>
        <View style={bsbStyles.sectionHeader}>
          <Text style={bsbStyles.sectionLable}>Library Preview</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Library')}>
            <Text style={bsbStyles.more}>See All</Text>
          </TouchableOpacity>
        </View>
        {
          library.slice(0, 5).map(item => (
            <StoryPreview
              navigation={navigation}
              item={item}
            />
          ))
        }
      </View>

      <View style={bsbStyles.section}>
        <View style={bsbStyles.sectionHeader}>
          <Text style={bsbStyles.sectionLable}>Near By</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Near')}>
            <Text style={bsbStyles.more}>See All</Text>
          </TouchableOpacity>
        </View>
        {
          stories.slice(0, 5).map(item => (
            <StoryPreview
              navigation={navigation}
              item={item}
            />
          ))
        }
      </View>
    </View>
  );
};