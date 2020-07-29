import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import {
  Ionicons
} from '@expo/vector-icons';

import { Context as SearchContext } from './../../providers/SearchProvider.js';
import { Context as StoryContext } from './../../providers/StoryProvider.js';
import { Context as LayoutContext } from '../../providers/LayoutProvider.js';
import { Context as JourneyContext } from './../../providers/JourneyProvider.js';

import BottomSheet from 'reanimated-bottom-sheet';
import { useNavigation } from '@react-navigation/native';

export const NavigationBottomSheet = () => {
  const { state: {
    deviceHeight,
    bottomSheetHeaderHeight,
    headerHeight,
    topInset,
    bottomInset,
    navigationBottomSheetRef,
  } } = React.useContext(LayoutContext);
  const { state: { stories } } = React.useContext(StoryContext);
  const { state: { journeyId } } = React.useContext(JourneyContext);

  const story = stories.find(s => s._id === journeyId);

  const NONSCREEN = headerHeight + topInset + bottomInset + bottomSheetHeaderHeight;

  return bottomInset ?
    <BottomSheet
      ref={navigationBottomSheetRef}
      snapPoints={[
        deviceHeight - NONSCREEN,
        deviceHeight / 2 - NONSCREEN,
        journeyId ? bottomInset + bottomSheetHeaderHeight : 0
      ]}
      initialSnap={2}
      enabledContentTapInteraction={false}
      enabledBottomInitialAnimation={true}
      renderHeader={() => <BottomSheetHeader />}
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
  headerInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  myLocation: {
    color: 'rgb(255,50,50)'
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

const BottomSheetHeader = () => {
  const { state: {
    bottomSheetHeaderHeight,
    storyBottomSheetRef,
    navigationBottomSheetRef,
  } } = React.useContext(LayoutContext);
  const { setStory } = React.useContext(SearchContext);
  const { state: { journeyId }, clearJourney } = React.useContext(JourneyContext);

  const unmountJourney = () => {
    storyBottomSheetRef.current.snapTo(1);
    navigationBottomSheetRef.current.snapTo(2);
    setStory(journeyId);
    clearJourney();
  }

  return (
    <View style={[
      styles.header,
      {
        height: bottomSheetHeaderHeight * 2,
      }]}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle}></View>
      </View>

      <View style={styles.headerInfo}>
        <View>
          <Text style={styles.title}>Journey Title</Text>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.distance}>From</Text>
            <TouchableOpacity onPress={() => true}>
              <Text style={styles.myLocation}> My Location</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          style={styles.back}
          onPress={unmountJourney}
        >
          <Ionicons name='ios-close' size={25} color='white' />
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
  start: {
    backgroundColor: 'rgb(255,50,50)',
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginTop: 10,
  },
  startText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20
  }
});

const BottomSheetBody = () => {
  const navigation = useNavigation()
  const { state: { bottomSheetHeight } } = React.useContext(LayoutContext);

  return (
    <View style={[bsbStyles.panel, { minHeight: bottomSheetHeight }]}>
      <Text style={{ textAlign: 'center' }}>When you have arrived, click 'start story'</Text>
      <TouchableOpacity
        style={bsbStyles.start}
        onPress={() => navigation.navigate('ExploreStoryScreen')}
      >
        <Text style={bsbStyles.startText}>Start Story</Text>
      </TouchableOpacity>
    </View>
  );
};