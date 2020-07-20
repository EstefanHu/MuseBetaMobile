import React from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard
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
});

const PANNEL_HEADER_HEIGHT = 30;

export const ExploreHomeScreen = ({ navigation }) => {
  const { state: { stories } } = React.useContext(StoryContext);
  const { state: { longitude, latitude } } = React.useContext(LocationContext);
  const { state: { headerHeight, topInset, bottomInset } } = React.useContext(LayoutContext);

  const [isSearching, setIsSearching] = React.useState(false);
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
  const bs = React.createRef();
  const fall = new Animated.Value(1);

  const mapRef = React.useRef(null);
  const inputRef = React.useRef(null);

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

  const cancelSearch = () => {
    inputRef.current.blur();
    setIsSearching(false);
    Keyboard.dismiss();
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
        snapPoints={[
          Dimensions.get('window').height - headerHeight
          - topInset - bottomInset - PANNEL_HEADER_HEIGHT,
          Dimensions.get('window').height / 2 - headerHeight
          - topInset - bottomInset - PANNEL_HEADER_HEIGHT,
          bottomInset + PANNEL_HEADER_HEIGHT
        ]}
        initialSnap={2}
        callbackNode={fall}
        enabledBottomClamp={true}
        renderHeader={
          () =>
            <BottomSheetHeader
              search={search}
              setSearch={setSearch}
              isSearching={isSearching}
              setIsSearching={setIsSearching}
              bs={bs}
              inputRef={inputRef}
            />
        }
        renderContent={() => <BottomSheetBody />}
        onCloseStart={cancelSearch}
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
    color: 'blue',
    marginLeft: 10,
    fontSize: 16
  },
  panel: {
    paddingHorizontal: 10,
    backgroundColor: 'rgba(255,255,255,0.8)',
    paddingTop: 10,
    height: '100%'
  },
})

const BottomSheetHeader = ({ search, setSearch,
  isSearching, setIsSearching, bs, inputRef }) => {
  const startSearch = () => {
    inputRef.current.focus();
    setIsSearching(true);
    bs.current.snapTo(0);
  }

  const cancelSearch = () => {
    inputRef.current.blur();
    setIsSearching(false);
    bs.current.snapTo(1);
  }

  return (
    <View style={bsStyles.header}>
      <View style={bsStyles.panelHeader}>
        <View style={bsStyles.panelHandle}></View>
      </View>
      <View style={bsStyles.searchContainer}>
        <TouchableWithoutFeedback onPress={startSearch}>
          <View style={bsStyles.searchInputContainer}>
            <MaterialIcons name='search' size={22} color='black' />
            <TextInput
              ref={inputRef}
              style={bsStyles.searchInput}
              underlineColorAndroid='rgba(0,0,0,0)'
              placeholder="Search"
              onSubmitEditing={() => console.log('testing')}
              value={search}
              onChangeText={text => setSearch(text)}
              onFocus={startSearch}
              onBlur={cancelSearch}
              clearButtonMode={'always'}
            />
          </View>
        </TouchableWithoutFeedback>
        {
          isSearching && <TouchableOpacity onPress={cancelSearch}>
            <Text style={bsStyles.cancelSearch}>Cancel</Text>
          </TouchableOpacity>
        }
      </View>
    </View >
  );
};

const BottomSheetBody = () => {

  return (
    <View style={bsStyles.panel}>
      <Text>Hello World</Text>
    </View>
  );
};