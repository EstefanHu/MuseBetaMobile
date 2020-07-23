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
  Ionicons,
  Feather,
  FontAwesome,
  Octicons
} from '@expo/vector-icons';
import { useDateFormat } from './../hooks/useDateFormat.js';

import { Context as SearchContext } from './../providers/SearchProvider.js';
import { Context as LayoutContext } from './../providers/LayoutProvider.js';
import { Context as StoryContext } from './../providers/StoryProvider.js';
import { Context as ProfileContext } from './../providers/ProfileProvider.js';

import BottomSheet from 'reanimated-bottom-sheet';

const PANNEL_HEADER_HEIGHT = 30;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

export const StoryBottomSheet = ({ navigation, initialBS, storyBS }) => {
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
            navigation={navigation}
            story={story}
          />
      }
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

const BottomSheetHeader = ({ story, deactivate }) => (
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
  bottomAction: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
  },
  bottomActionText: {
    color: 'rgb(255,50,50)',
    fontSize: 20,
  },
  bottomActionIcon: {
    height: 40,
    width: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(100,100,100,0.1)'
  }
});

const BottomSheetBody = ({ navigation, story }) => {
  const { state: { libraryIds }, addToLibrary, removeFromLibrary } = React.useContext(ProfileContext);
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

  return (
    <View style={bodyStyles.panel}>
      <TouchableOpacity
        style={bodyStyles.beginButton}
      >
        <Text style={bodyStyles.beginText}>Begin Story</Text>
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

      <TouchableOpacity
        style={bodyStyles.bottomAction}
        onPress={() => navigation.navigate('ReportStack', { storyId: story._id })}
      >
        <Text style={bodyStyles.bottomActionText}>Report an Issue</Text>
        <View style={bodyStyles.bottomActionIcon}>
          <Octicons name='report' size={18} color='rgb(255,50,50)' />
        </View>
      </TouchableOpacity>

    </View>
  );
};