import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import {
  Ionicons,
  Entypo,
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
    storyBottomSheetRef,
    navigationBottomSheetRef,
  } } = React.useContext(LayoutContext);
  const { setStory } = React.useContext(SearchContext);
  const { state: { stories } } = React.useContext(StoryContext);
  const { state: { journeyId }, clearJourney } = React.useContext(JourneyContext);

  const story = stories.find(s => s._id === journeyId);

  const unmountJourney = () => {
    storyBottomSheetRef.current.snapTo(1);
    navigationBottomSheetRef.current.snapTo(2);
    setStory(journeyId);
    clearJourney();
  }

  return (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle}></View>
      </View>

      <View style={styles.headerInfo}>
        <View>
          <Text style={styles.title}>To {story?.title}</Text>
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
  },
  guide: {
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  abstract: {
    paddingHorizontal: 10,

  },
  node: {
    paddingVertical: 5,
  },
  icon: {
    width: 30,
    height: 30,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonSlider: {
  },
  button: {
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  }
});

const BottomSheetBody = () => {
  const navigation = useNavigation()
  const { state: { bottomSheetHeight } } = React.useContext(LayoutContext);
  const { state: { stories } } = React.useContext(StoryContext);
  const { state: { startLocation, locations } } = React.useContext(JourneyContext);
  const [count, setCount] = React.useState(1);

  return (
    <View style={[bsbStyles.panel, { minHeight: bottomSheetHeight }]}>
      <View style={bsbStyles.guide}>
        <View style={bsbStyles.abstract}>
          <View style={bsbStyles.node}>
            <View style={[bsbStyles.icon, { backgroundColor: count === 0 ? 'rgb(255,50,50)' : 'lightgrey' }]}>
              <Entypo name='location-pin' size={22} color='white' />
            </View>
          </View>
          {locations?.map(
            (l, idx) =>
              <NodeItem
                key={l._id}
                idx={idx === count + 1}
                node={l}
              />
          )}
        </View>

        <View style={bsbStyles.buttonSlider}>
          <TouchableOpacity
            style={[
              bsbStyles.button,
              {
                backgroundColor:
                  count < locations?.length ?
                    'rgb(255,50,50)' : 'lightgrey'
              }
            ]}
            onPress={() => true}
          >
            <Text style={bsbStyles.buttonText}>Start Node</Text>
          </TouchableOpacity>
        </View>
      </View>
      {
        count > locations?.length && <>
          <TouchableOpacity
            style={[bsbStyles.button, { backgroundColor: 'rgb(255,50,50)' }]}
            onPress={() => navigation.navigate('ExploreReviewScreen')}
          >
            <Text style={bsbStyles.buttonText}>Review</Text>
          </TouchableOpacity>

          <BSActions />
        </>
      }
    </View >
  );
};

const nodeStyles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(200,200,200,0.8)',
  },
  node: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(200,200,200,0.8)',
  },
  nodeIcon: {
    height: 20,
    width: 20,
    borderRadius: 10,
    backgroundColor: 'rgb(255,50,50)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(200,200,200,0.8)',
  }
});

const NodeItem = ({ node, selected }) => {
  const [bread, setBread] = React.useState(false);
  const [enabled, setEnabled] = React.useState(false);

  return (
    <View style={nodeStyles.container}>
      <View style={nodeStyles.bread}>
        <View style={nodeStyles.breadIcon}>

        </View>
      </View>

      <View style={nodeStyles.node}>
        <View style={nodeStyles.nodeIcon}>
          <Entypo
            name='location-pin'
            size={20}
            color={selected ? 'rgb(255,50,50)' : 'lightgrey'}
          />
        </View>
      </View>
    </View>
  );
};