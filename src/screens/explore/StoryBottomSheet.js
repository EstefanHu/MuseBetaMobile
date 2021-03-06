import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  Linking,
  Alert,
} from 'react-native';
import {
  Ionicons,
  Feather,
  FontAwesome,
  Octicons
} from '@expo/vector-icons';
import { useDateFormat } from '../../hooks/useDateFormat.js';
import { useMeasureDistance } from '../../hooks/useMeasureDistance.js';
import { useNavigation } from '@react-navigation/native';

import { Context as SearchContext } from '../../providers/SearchProvider.js';
import { Context as LayoutContext } from '../../providers/LayoutProvider.js';
import { Context as StoryContext } from '../../providers/StoryProvider.js';
import { Context as ProfileContext } from '../../providers/ProfileProvider.js';
import { Context as LocationContext } from '../../providers/LocationProvider.js';
import { Context as JourneyContext } from './../../providers/JourneyProvider.js';

import BottomSheet from 'reanimated-bottom-sheet';
import { BSActions } from '../../components/BSActions.js';

export const StoryBottomSheet = () => {
  const { state: {
    deviceHeight,
    bottomSheetHeaderHeight,
    headerHeight,
    topInset,
    bottomInset,
    storyBottomSheetRef,
  } } = React.useContext(LayoutContext);
  const { state: { storyId } } = React.useContext(SearchContext);
  const { state: { stories } } = React.useContext(StoryContext);

  const story = stories.find(s => s._id === storyId);

  const NONSCREEN = headerHeight + topInset + bottomInset + bottomSheetHeaderHeight;

  return bottomInset ?
    <BottomSheet
      ref={storyBottomSheetRef}
      snapPoints={[
        deviceHeight - NONSCREEN,
        deviceHeight / 2 - NONSCREEN,
        storyId ? bottomInset + bottomSheetHeaderHeight : 0
      ]}
      initialSnap={2}
      enabledContentTapInteraction={false}
      enabledBottomInitialAnimation={true}
      renderHeader={() => <BottomSheetHeader story={story} />}
      renderContent={() => <BottomSheetBody story={story} />}
    /> : null
};

const headerStyles = StyleSheet.create({
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
  distance: {

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

const BottomSheetHeader = ({ story }) => {
  const { state: { initialBottomSheetRef, storyBottomSheetRef } } = React.useContext(LayoutContext);
  const { clearStory } = React.useContext(SearchContext);

  const deactivate = () => {
    initialBottomSheetRef.current.snapTo(1);
    storyBottomSheetRef.current.snapTo(2);
    clearStory();
  }

  return (
    <View style={headerStyles.header}>
      <View style={headerStyles.panelHeader}>
        <View style={headerStyles.panelHandle}></View>
      </View>

      <View style={headerStyles.headerInfo}>
        <View>
          <Text style={headerStyles.title}>{story?.title}</Text>
          <Text style={bodyStyles.distance}>distance...</Text>
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
};

const bodyStyles = StyleSheet.create({
  panel: {
    padding: 20,
    backgroundColor: 'rgba(255,255,255,0.8)',
    paddingTop: 20,
    height: '100%'
  },
  beginButton: {
    backgroundColor: 'rgb(255,50,50)',
    width: '100%',
    paddingVertical: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  beginText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
  directionsButton: {
    backgroundColor: 'rgb(235,235,235)',
    width: '100%',
    paddingVertical: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15
  },
  directionsText: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  actionContainer: {
    marginVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  actionButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 90,
    height: 50,
    borderRadius: 5,
    backgroundColor: 'rgba(100,100,100,0.1)',
  },
  actionLabel: {
    color: 'rgb(255,50,50)',
    fontSize: 12,
  },
  section: {
    paddingVertical: 15,
    borderBottomColor: 'rgba(200,200,200,0.8)',
    borderBottomWidth: 1,
  },
  sectionLabel: {
    fontSize: 13,
    color: 'rgba(150,150,150,0.8)',
    marginBottom: 5
  },
  sectionText: {
    fontSize: 16
  },
});

const BottomSheetBody = ({ story }) => {
  const { state: {
    deviceHeight,
    bottomSheetHeaderHeight,
    headerHeight,
    topInset,
    bottomInset,
    mapRef,
    storyBottomSheetRef,
    navigationBottomSheetRef
  } } = React.useContext(LayoutContext);
  const { state: { libraryIds }, addToLibrary, removeFromLibrary } = React.useContext(ProfileContext);
  const { state: { longitude, latitude } } = React.useContext(LocationContext);
  const { setJourney } = React.useContext(JourneyContext);
  const { clearStory } = React.useContext(SearchContext);
  const [isSaved, setIsSaved] = React.useState(false);

  React.useEffect(() => {
    setIsSaved(libraryIds.includes(story?._id));
  }, [libraryIds]);

  const saveStory = async () => {
    await addToLibrary(story);
    setIsSaved(true);
  }

  const removeStory = async () => {
    removeFromLibrary(story._id);
    setIsSaved(false);
  }

  const beginStory = () => {
    const sLat = story.startLocation.coordinates[1];
    const sLon = story.startLocation.coordinates[0];
    const distance = useMeasureDistance(latitude, longitude, sLat, sLon);
    distance > 10 ?
      Alert.alert(
        'You\'re too far away',
        'Being near the story creates a more emersive expereince, are you sure you don\'t want to wait?',
        [
          {
            text: 'Wait',
            onPress: () => null,
            style: 'cancel'
          },
          {
            text: 'I know what I\'m doing!',
            onPress: () => fitPoints(sLat, sLon)
          }
        ]
      ) : fitPoints(sLat, sLon);

      fitPoints(sLat,sLon)
  }

  const fitPoints = (sLat, sLon) => {
    const POINTS = [{
      longitude: sLon,
      latitude: sLat
    }, { longitude, latitude }]
    const OPTIONS = {
      edgePadding: {
        top: 50,
        right: 60,
        bottom: deviceHeight / 2 + 50
          - (headerHeight + topInset + bottomInset + bottomSheetHeaderHeight),
        left: 60
      }
    }
    mapRef.current.fitToCoordinates(POINTS, OPTIONS);
    storyBottomSheetRef.current.snapTo(2);
    navigationBottomSheetRef.current.snapTo(1);
    setJourney(story);
    clearStory();
  }

  const getDirections = () => {
    const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
    const latLng = `${story.startLocation.coordinates[1]},${story.startLocation.coordinates[0]}`;
    const label = story.title;
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`
    });

    Linking.openURL(url);
  }

  return (
    <View style={bodyStyles.panel}>
      <TouchableOpacity
        style={bodyStyles.beginButton}
        onPress={beginStory}
      >
        <Text style={bodyStyles.beginText}>Begin Story</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={bodyStyles.directionsButton}
        onPress={getDirections}
      >
        <Text style={bodyStyles.directionsText}>Get Directions</Text>
      </TouchableOpacity>

      <View style={bodyStyles.actionContainer}>
        {
          isSaved ?
            <TouchableOpacity onPress={removeStory}>
              <View style={bodyStyles.actionButton}>
                <FontAwesome name='bookmark' size={18} color='rgb(255,50,50)' />
                <Text style={bodyStyles.actionLabel}>Remove</Text>
              </View>
            </TouchableOpacity>
            : <TouchableOpacity onPress={saveStory}>
              <View style={bodyStyles.actionButton}>
                <FontAwesome name='bookmark-o' size={18} color='rgb(255,50,50)' />
                <Text style={bodyStyles.actionLabel}>Save</Text>
              </View>
            </TouchableOpacity>
        }

        <TouchableOpacity
          style={bodyStyles.actionButton}
          onPress={() => null}
        >
          <Feather name='share' size={18} color='rgb(255,50,50)' />
          <Text style={bodyStyles.actionLabel}>Share</Text>
        </TouchableOpacity>
      </View>

      <View style={bodyStyles.section}>
        <Text style={bodyStyles.sectionLabel}>Info</Text>
        <Text style={bodyStyles.sectionText}>Channel: {story?.channel}</Text>
        <View style={{ flexDirection: 'row' }}>
          <Text style={bodyStyles.sectionText}>Author: </Text>
          <TouchableOpacity onPress={() => console.log(story?.authorId)}>
            <Text style={bodyStyles.sectionText}>{story?.authorName}</Text>
          </TouchableOpacity>
        </View>
        <Text style={bodyStyles.sectionText}>Post Date: {story ? useDateFormat(story.createdAt) : null}</Text>
      </View>

      <View style={bodyStyles.section}>
        <Text style={bodyStyles.sectionLabel}>Pitch</Text>
        <Text style={bodyStyles.sectionText}>{story?.pitch}</Text>
      </View>

      <View style={bodyStyles.section}>
        <Text style={bodyStyles.sectionLabel}>Reviews</Text>

      </View>

      <BSActions />
    </View>
  );
};