import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import Animated, {
  Easing,
} from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';

import { Context as LayoutContext } from './../../providers/LayoutProvider.js';
import { Context as ProfileContext } from '../../providers/ProfileProvider.js'; // TODO: Update Librayr to seperate context
import { Context as SearchContext } from './../../providers/SearchProvider.js';
import { Context as JourneyContext } from './../../providers/JourneyProvider.js';

import BottomSheet from 'reanimated-bottom-sheet';
import { StoryPreview } from './../../components/StoryPreview.js';
import { BSSearch } from './../../components/BSSearch.js';

export const InitialBottomSheet = ({ stories }) => {
  const { state: {
    deviceHeight,
    deviceWidth,
    headerHeight,
    topInset,
    bottomInset,
    bottomSheetHeaderHeight,
    inputRef,
    initialBottomSheetRef
  } } = React.useContext(LayoutContext);
  const { state: { library }, fetchLibrary } = React.useContext(ProfileContext);
  const { state: { initialized, storyId, catagory }, cancelQuery } = React.useContext(SearchContext);
  const { state: { journeyId } } = React.useContext(JourneyContext);

  React.useEffect(() => {
    fetchLibrary();
  }, []);

  const cancelSearch = () => {
    if (initialized) {
      inputRef.current.blur();
      cancelQuery();
      Keyboard.dismiss();
      growSearchBar();
    }
  }

  const widthAnim = React.useRef(new Animated.Value(deviceWidth - 40)).current;
  const marginAnim = React.useRef(new Animated.Value(20)).current;

  const shrinkSearchBar = () => {
    Animated.timing(widthAnim, {
      toValue: deviceWidth - 100,
      duration: 350,
      easing: Easing.inOut(Easing.ease)
    }).start();

    Animated.timing(marginAnim, {
      toValue: 10,
      duration: 350,
      easing: Easing.inOut(Easing.ease)
    }).start();
  };

  const growSearchBar = () => {
    Animated.timing(widthAnim, {
      toValue: deviceWidth - 40,
      duration: 300,
      easing: Easing.inOut(Easing.ease)
    }).start();

    Animated.timing(marginAnim, {
      toValue: 20,
      duration: 300,
      easing: Easing.inOut(Easing.ease)
    }).start();
  };

  const NONSCREEN = + headerHeight + topInset + bottomInset + bottomSheetHeaderHeight;

  return bottomInset ?
    <BottomSheet
      ref={initialBottomSheetRef}
      snapPoints={[
        deviceHeight - NONSCREEN,
        deviceHeight / 2 - NONSCREEN,
        storyId || catagory || journeyId ? 0 : bottomInset + bottomSheetHeaderHeight
      ]}
      initialSnap={2}
      enabledContentTapInteraction={false}
      // callbackNode={bsNodeTracker}
      onCloseEnd={cancelSearch}
      onCloseStart={cancelSearch}
      renderHeader={
        () =>
          <BottomSheetHeader
            cancelSearch={cancelSearch}
            initialized={initialized}
            widthAnim={widthAnim}
            marginAnim={marginAnim}
            shrinkSearchBar={shrinkSearchBar}
            growSearchBar={growSearchBar}
          />
      }
      renderContent={
        () =>
          <BottomSheetBody
            stories={stories}
            library={library}
          />
      }
    /> : null
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(200,200,200,0.4)',
    borderLeftWidth: 1,
    borderLeftColor: 'rgba(200,200,200,0.4)',
    borderRightWidth: 1,
    borderRightColor: 'rgba(200,200,200,0.4)',
    paddingVertical: 5,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    paddingHorizontal: 20,
  },
  panelHeader: {
    width: '100%',
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
  },
  searchInput: {
    paddingHorizontal: 5,
    flex: 1,
  },
  cancelSearch: {
    color: 'rgba(0,100,255,0.8)',
    fontSize: 18
  }
});

const BottomSheetHeader = ({ cancelSearch, widthAnim, marginAnim, shrinkSearchBar, growSearchBar }) => {
  const { state: { query }, initializeQuery, updateQuery } = React.useContext(SearchContext);
  const { state: { deviceWidth, inputRef, initialBottomSheetRef } } = React.useContext(LayoutContext);

  const startSearch = () => {
    inputRef.current.focus();
    initialBottomSheetRef.current.snapTo(0);
    initializeQuery();
    shrinkSearchBar()
  }

  const startListening = () => {
    startSearch();
  }

  return (
    <View style={[styles.header, { width: deviceWidth }]}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle}></View>
      </View>
      <View style={styles.searchContainer}>
        <TouchableWithoutFeedback onPress={startSearch}>
          <Animated.View style={[
            styles.searchInputContainer,
            { width: widthAnim }
          ]}>
            <MaterialIcons name='search' size={22} color='grey' />
            <TextInput
              ref={inputRef}
              style={styles.searchInput}
              underlineColorAndroid='rgba(0,0,0,0)'
              placeholder="Search"
              onSubmitEditing={() => console.log('testing')}
              value={query}
              onChangeText={text => updateQuery(text)}
              onFocus={startSearch}
              clearButtonMode={'always'}
              autoCorrect={false}
            />
            <TouchableOpacity onPress={startListening}>
              <FontAwesome name='microphone' size={22} color='grey' />
            </TouchableOpacity>
          </Animated.View>
        </TouchableWithoutFeedback>
        <TouchableOpacity
          onPress={() => {
            initialBottomSheetRef.current.snapTo(1);
            cancelSearch();
            growSearchBar();
          }}>
          <Animated.Text style={[
            styles.cancelSearch,
            { marginLeft: marginAnim }
          ]}>Cancel</Animated.Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const bsbStyles = StyleSheet.create({
  panel: {
    paddingHorizontal: 20,
    backgroundColor: 'rgba(255,255,255,0.8)',
    paddingTop: 10,
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
  sectionLabel: {
    color: 'grey',
    fontSize: 13
  },
  more: {
    color: 'rgba(0, 100, 255, 0.7)',
    fontSize: 13
  },
});

const BottomSheetBody = ({ stories, library }) => {
  const navigation = useNavigation();
  const { state: { bottomSheetHeight } } = React.useContext(LayoutContext);
  const { state: { initialized } } = React.useContext(SearchContext);

  return (
    <View style={[bsbStyles.panel, { minHeight: bottomSheetHeight }]}>
      {
        initialized ?
          <BSSearch />
          : <>
            <View style={bsbStyles.section}>
              <View style={bsbStyles.sectionHeader}>
                <Text style={bsbStyles.sectionLabel}>Library Preview</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Library')}>
                  <Text style={bsbStyles.more}>See All</Text>
                </TouchableOpacity>
              </View>
              {
                library.slice(0, 5).map(item => (
                  <StoryPreview
                    key={item._id}
                    item={item}
                  />
                ))
              }
            </View>

            <View style={bsbStyles.section}>
              <View style={bsbStyles.sectionHeader}>
                <Text style={bsbStyles.sectionLabel}>Top Stories</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Top')}>
                  <Text style={bsbStyles.more}>See All</Text>
                </TouchableOpacity>
              </View>
              {
                stories.slice(0, 5).map(item => (
                  <StoryPreview
                    key={item._id}
                    item={item}
                  />))
              }
            </View>
          </>
      }
    </View>
  );
};