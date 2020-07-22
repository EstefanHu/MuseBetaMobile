import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Dimensions
} from 'react-native';
import {
  Ionicons
} from '@expo/vector-icons';

import { Context as SearchContext } from './../providers/SearchProvider.js';
import { Context as LayoutContext } from './../providers/LayoutProvider.js';
import { Context as StoryContext } from './../providers/StoryProvider.js';

import BottomSheet from 'reanimated-bottom-sheet';

const PANNEL_HEADER_HEIGHT = 30;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
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

export const StoryBottomSheet = ({ initialBS, storyBS }) => {
  const { state: { headerHeight, topInset, bottomInset } } = React.useContext(LayoutContext);
  const { state: { storyId }, clearStory } = React.useContext(SearchContext);
  const { state: { stories } } = React.useContext(StoryContext);

  const story = stories.find(s => s._id === storyId);

  const deactivate = () => {
    initialBS.current.snapTo(1);
    storyBS.current.snapTo(2);
    clearStory();
  }

  return bottomInset ?
    <BottomSheet
      ref={storyBS}
      snapPoints={[
        SCREEN_HEIGHT - headerHeight
        - topInset - bottomInset - PANNEL_HEADER_HEIGHT,
        SCREEN_HEIGHT / 2 - headerHeight
        - topInset - bottomInset - PANNEL_HEADER_HEIGHT,
        storyId ? bottomInset + PANNEL_HEADER_HEIGHT : 0
      ]}
      initialSnap={2}
      enabledBottomInitialAnimation={true}
      renderHeader={
        () =>
          <BottomSheetHeader
            story={story}
            deactivate={deactivate}
          />
      }
      renderContent={
        () =>
          <BottomSheetBody
          />
      }
    /> : null
};

const headerStyles = StyleSheet.create({
  header: {
    backgroundColor: 'white',
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
    alignItems: 'center'
  },
  panelHandle: {
    width: 40,
    height: 6,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 6,
  },
  headerInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  back: {
    backgroundColor: 'lightgrey',
    width: 25,
    height: 25,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

const BottomSheetHeader = ({ story, deactivate }) => (
  <View style={headerStyles.header}>
    <View style={headerStyles.panelHeader}>
      <View style={headerStyles.panelHandle}></View>
    </View>

    <View style={headerStyles.headerInfo}>
      <View>
        <Text style={headerStyles.title}>Story</Text>
        <Text style={headerStyles.results}></Text>
      </View>

      <TouchableOpacity
        style={headerStyles.back}
        onPress={deactivate}
      >
        <Ionicons name='ios-close' size={25} color='white' />
      </TouchableOpacity>
    </View>
  </View>
);

const BottomSheetBody = () => {

  return (
    <View style={styles.panel}>
      <Text>Hello World</Text>
    </View>
  );
};