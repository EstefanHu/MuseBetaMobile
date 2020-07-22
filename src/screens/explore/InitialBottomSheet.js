import React from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { Context as LayoutContext } from './../../providers/LayoutProvider.js';
import { Context as ProfileContext } from '../../providers/ProfileProvider.js'; // TODO: Temp
import { Context as SearchContext } from './../../providers/SearchProvider.js';

import BottomSheet from 'reanimated-bottom-sheet';
import { StoryPreview } from '../../components/StoryPreview.js';
import { BSSearch } from './../../components/BSSearch.js';

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
    alignItems: 'center',
    width: Dimensions.get('window').width + 2,
    transform: [{ translateX: -1 }]
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

const PANNEL_HEADER_HEIGHT = 30;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export const InitialBottomSheet = ({ navigation, initialBS, searchBS, fall, cancelSearch, inputRef, stories }) => {
  const { state: { headerHeight, topInset, bottomInset } } = React.useContext(LayoutContext);
  const { state: { library }, fetchLibrary } = React.useContext(ProfileContext);

  React.useEffect(() => {
    fetchLibrary();
  }, []);

  return bottomInset ?
    <BottomSheet
      ref={initialBS}
      snapPoints={[
        SCREEN_HEIGHT - headerHeight
        - topInset - bottomInset - PANNEL_HEADER_HEIGHT,
        SCREEN_HEIGHT / 2 - headerHeight
        - topInset - bottomInset - PANNEL_HEADER_HEIGHT,
        bottomInset + PANNEL_HEADER_HEIGHT
      ]}
      initialSnap={2}
      callbackNode={fall}
      enabledBottomClamp={true}
      onCloseStart={() => cancelSearch(1)}
      onCloseEnd={() => cancelSearch(2)}
      renderHeader={
        () =>
          <BottomSheetHeader
            initialBS={initialBS}
            inputRef={inputRef}
            cancelSearch={cancelSearch}
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
          />
      }
    /> : null
};

const BottomSheetHeader = ({ initialBS, inputRef, cancelSearch }) => {
  const { state: { initialized, query }, initializeQuery, updateQuery } = React.useContext(SearchContext);

  const startSearch = () => {
    inputRef.current.focus();
    initialBS.current.snapTo(0);
    initializeQuery();
  }

  return (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle}></View>
      </View>
      <View style={styles.searchContainer}>
        <TouchableWithoutFeedback onPress={startSearch}>
          <View style={styles.searchInputContainer}>
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
          </View>
        </TouchableWithoutFeedback>
        {
          initialized && <TouchableOpacity onPress={() => cancelSearch(1)}>
            <Text style={styles.cancelSearch}>Cancel</Text>
          </TouchableOpacity>
        }
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

const BottomSheetBody = ({ navigation, stories, library, initialBS, searchBS }) => {
  const { state: { initialized } } = React.useContext(SearchContext);

  return (
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
                    navigation={navigation}
                    item={item}
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
                    navigation={navigation}
                    item={item}
                  />
                ))
              }
            </View>
          </>
      }
    </View>
  );
};