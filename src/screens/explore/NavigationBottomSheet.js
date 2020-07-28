import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';

import { Context as SearchContext } from './../../providers/SearchProvider.js';
import { Context as StoryContext } from './../../providers/StoryProvider.js';
import { Context as LayoutContext } from '../../providers/LayoutProvider.js';

import BottomSheet from 'reanimated-bottom-sheet';

export const NavigationBottomSheet = () => {
  const { state: {
    deviceHeight,
    bottomSheetHeaderHeight,
    headerHeight,
    topInset,
    bottomInset,
    initialBottomSheetRef,
    storyBottomSheetRef,
    navigationBottomSheetRef,
  } } = React.useContext(LayoutContext);
  const { state: { storyId }, clearStory } = React.useContext(SearchContext);
  const { state: { stories } } = React.useContext(StoryContext);

  const story = stories.find(s => s._id === storyId);

  const NONSCREEN = headerHeight + topInset + bottomInset + bottomSheetHeaderHeight;

  return bottomInset ?
    <BottomSheet
      ref={navigationBottomSheetRef}
      snapPoints={[
        deviceHeight - NONSCREEN,
        deviceHeight / 2 - NONSCREEN,
        storyId ? bottomInset + bottomSheetHeaderHeight : 0
      ]}
      initialSnap={2}
      enabledBottomInitialAnimation={true}
      renderHeader={() => <BottomSheetHeader story={story} />}
      renderContent={() => <BottomSheetBody story={story} />}
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
});

const BottomSheetHeader = () => {
  const { state: { deviceWidth, bottomSheetHeaderHeight, initialBottomSheetRef } } = React.useContext(LayoutContext);

  return (
    <View style={[
      styles.header,
      {
        height: bottomSheetHeaderHeight * 2,
        width: deviceWidth
      }]}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle}></View>
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

const BottomSheetBody = () => {
  const { state: { bottomSheetHeight } } = React.useContext(LayoutContext);

  return (
    <View style={[bsbStyles.panel, { minHeight: bottomSheetHeight }]}>

    </View>
  );
};