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
  ScrollView,
  KeyboardAvoidingView
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Animated, { Easing } from 'react-native-reanimated';

import { Context as LayoutContext } from './../../providers/LayoutProvider.js';
import { Context as ProfileContext } from '../../providers/ProfileProvider.js'; // TODO: Temp
import { Context as SearchContext } from './../../providers/SearchProvider.js';

import BottomSheet from 'reanimated-bottom-sheet';
import { StoryPreview } from '../../components/StoryPreview.js';
import { BSSearch } from './../../components/BSSearch.js';

const PANNEL_HEADER_HEIGHT = 30;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

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
    width: SCREEN_WIDTH + 2,
    transform: [{ translateX: -1 }]
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

export const InitialBottomSheet = ({ navigation, initialBS, searchBS, storyBS, inputRef, stories }) => {
  const { state: { headerHeight, topInset, bottomInset } } = React.useContext(LayoutContext);
  const { state: { library }, fetchLibrary } = React.useContext(ProfileContext);
  const { state: { initialized, storyId, catagory }, cancelQuery } = React.useContext(SearchContext);

  const [allowScrolling, setAllowScrolling] = React.useState(false);

  console.log(allowScrolling)

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

  const widthAnim = React.useRef(new Animated.Value(SCREEN_WIDTH - 40)).current;
  const marginAnim = React.useRef(new Animated.Value(20)).current;

  const shrinkSearchBar = () => {
    Animated.timing(widthAnim, {
      toValue: SCREEN_WIDTH - 100,
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
      toValue: SCREEN_WIDTH - 40,
      duration: 300,
      easing: Easing.inOut(Easing.ease)
    }).start();

    Animated.timing(marginAnim, {
      toValue: 20,
      duration: 300,
      easing: Easing.inOut(Easing.ease)
    }).start();
  };

  return bottomInset ?
    <BottomSheet
      ref={initialBS}
      snapPoints={[
        SCREEN_HEIGHT - headerHeight
        - topInset - bottomInset - PANNEL_HEADER_HEIGHT,
        SCREEN_HEIGHT / 2 - headerHeight
        - topInset - bottomInset - PANNEL_HEADER_HEIGHT,
        storyId || catagory ? 0 : bottomInset + PANNEL_HEADER_HEIGHT
      ]}
      initialSnap={2}
      enabledBottomInitialAnimation={true}
      // onCloseStart={cancelSearch}
      onCloseEnd={cancelSearch}

      onOpenEnd={() => setAllowScrolling(true)}
      enabledInnerScrolling={true}
      onCloseStart={() => {
        setAllowScrolling(false);
        cancelSearch();
      }}
      enabledGestureInteraction={true}
      overdragResistanceFactor={0}
      enabledHeaderGestureInteraction={true}
      enabledContentGestureInteraction={allowScrolling}

      renderHeader={
        () =>
          <BottomSheetHeader
            initialBS={initialBS}
            inputRef={inputRef}
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
            navigation={navigation}
            stories={stories}
            library={library}
            initialBS={initialBS}
            searchBS={searchBS}
            storyBS={storyBS}
            allowScrolling={allowScrolling}
            setAllowScrolling={setAllowScrolling}
          />
      }
    /> : null
};

const BottomSheetHeader = ({ initialBS, inputRef, cancelSearch,
  widthAnim, marginAnim, shrinkSearchBar, growSearchBar }) => {
  const { state: { query }, initializeQuery, updateQuery } = React.useContext(SearchContext);

  const startSearch = () => {
    inputRef.current.focus();
    initialBS.current.snapTo(0);
    initializeQuery();
    shrinkSearchBar()
  }

  return (
    <View style={styles.header}>
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
          </Animated.View>
        </TouchableWithoutFeedback>
        <TouchableOpacity
          onPress={() => {
            initialBS.current.snapTo(1);
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
  sectionLabel: {
    color: 'grey',
    fontSize: 13
  },
  more: {
    color: 'rgba(0, 100, 255, 0.7)',
    fontSize: 13
  },
});

const BottomSheetBody = ({ navigation, stories, library, initialBS, searchBS, storyBS, allowScrolling, setAllowScrolling }) => {
  const { state: { initialized } } = React.useContext(SearchContext);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={bsbStyles.panel}>
        {
          initialized ?
            <BSSearch
              navigation={navigation}
              initialBS={initialBS}
              searchBS={searchBS}
            /> : <>
              <View style={bsbStyles.section}>
                <View style={bsbStyles.sectionHeader}>
                  <Text style={bsbStyles.sectionLabel}>Docked Story</Text>
                </View>
              </View>

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
                      initialBS={initialBS}
                      storyBS={storyBS}
                    />
                  ))
                }
              </View>

              <View style={bsbStyles.section}>
                <View style={bsbStyles.sectionHeader}>
                  <Text style={bsbStyles.sectionLabel}>Nearby</Text>
                  <TouchableOpacity onPress={() => navigation.navigate('Near')}>
                    <Text style={bsbStyles.more}>See All</Text>
                  </TouchableOpacity>
                </View>
                {
                  stories.slice(0, 5).map(item => (
                    <StoryPreview
                      key={item._id}
                      item={item}
                      initialBS={initialBS}
                      storyBS={storyBS}
                    />
                  ))
                }
              </View>
            </>
        }
      </View>
    </KeyboardAvoidingView>
  );
};