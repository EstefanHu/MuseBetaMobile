import React, { useState, useEffect, useContext } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Dimensions
} from 'react-native';
import { useScrollToTop } from '@react-navigation/native';
import MapView, { Marker } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';

import { Context as JourneyContext } from './../../providers/JourneyProvider.js';
import { Context as StoryContext } from './../../providers/StoryProvider.js';
import { Context as LocationContext } from './../../providers/LocationProvider.js';

import { StoryCard } from './../../components/StoryCard.js';
import { Filter } from '../../components/Filter.js';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
});

export const JourneyHomeScreen = ({ navigation }) => {
  const { state: { stories }, fetchNearStories } = useContext(StoryContext);
  const { state: { longitude, latitude }, getCoords } = useContext(LocationContext);
  const { state: { storyId } } = useContext(JourneyContext);
  const [refreshing, setRefreshing] = useState(false);
  const [channel, setChannel] = useState('All');

  useEffect(() => {
    longitude ?
      fetchNearStories(5, longitude, latitude, 'mi')
      : getCoords();
  }, [longitude]);

  const scroll = React.useRef(null);
  useScrollToTop(scroll);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchNearStories(5, longitude, latitude, 'mi');
    setRefreshing(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Filter
        navigation={navigation}
        channel={channel}
        setChannel={c => setChannel(c)}
      />
      <FlatList
        ref={scroll}
        data={stories}
        onRefresh={onRefresh}
        refreshing={refreshing}
        keyExtractor={item => item._id}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() =>
          <>
            {
              storyId ?
                <LaunchPad
                  stories={stories}
                  longitude={longitude}
                  latitude={latitude}
                />
                : <NoStory />
            }
            <Text style={launchPadStyles.hero}>Stories around you</Text>
          </>
        }
        renderItem={({ item }) => {
          return item.channel === channel
            || channel === 'All' ?
            <StoryCard
              navigation={navigation}
              item={item}
            /> : null
        }}
      />
    </SafeAreaView >
  );
};

const launchPadStyles = StyleSheet.create({
  launcher: {
    backgroundColor: 'white',
    width: Dimensions.get('window').width - 20,
    paddingVertical: 15,
    paddingHorizontal: 15,
    marginTop: 10,
    borderRadius: 5,
  },
  mapStyle: {
    height: 150,
    width: '100%',
    borderRadius: 5,
    marginBottom: 15,
  },
  launchButton: {
    backgroundColor: 'rgb(255,50,50)',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  launchButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
  placeholder: {
    backgroundColor: 'rgb(240,240,240)',
    width: Dimensions.get('window').width - 20,
    paddingVertical: 15,
    paddingHorizontal: 15,
    marginTop: 10,
    borderRadius: 5,
  },
  hero: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'grey',
    marginTop: 15,
  },
})

const LaunchPad = ({ stories, longitude, latitude }) => {
  const { state: { storyId, story }, fetchJourney } = useContext(JourneyContext);
  const [id, setId] = useState();
  const [title, setTitle] = useState('');
  const [coordinates, setCoordinates] = useState();

  useEffect(() => {
    (async () => {
      let displayStory;
      if (storyId) {
        displayStory = stories.find(s => s._id === storyId);
        if (!displayStory)
          displayStory = story ? story : await fetchJourney(storyId);
      } else {
        displayStory = stories[
          Math.floor(
            Math.random() *
            Math.floor(stories.length)
          )];
      }
      setId(displayStory._id);
      setTitle(displayStory.title);
      setCoordinates(displayStory.startLocation.coordinates);
    })();
  }, [stories, storyId]);

  useEffect(() => {
    if (previewMap.current && coordinates)
      fitMarkers();
  }, [coordinates, previewMap]);

  const previewMap = React.useRef(null);

  const fitMarkers = () => {
    const MARKERS = [
      {
        latitude: coordinates[1],
        longitude: coordinates[0]
      },
      { latitude: latitude, longitude: longitude }
    ]
    const OPTIONS = {
      edgePadding: {
        top: 40,
        right: 60,
        bottom: 30,
        left: 60
      }
    }
    previewMap.current.fitToCoordinates(MARKERS, OPTIONS);
  }

  return (
    <View style={launchPadStyles.launcher} >
      <Text>{title}</Text>
      <MapView
        style={launchPadStyles.mapStyle}
        ref={previewMap}
        initialRegion={{
          longitude: longitude,
          latitude: latitude,
          longitudeDelta: 0.1,
          latitudeDelta: 0.1
        }}
        showsUserLocation
        scrollEnabled={false}
      >
        {
          coordinates &&
          <Marker
            coordinate={{
              latitude: coordinates[1],
              longitude: coordinates[0]
            }}
          />
        }
      </MapView>
      <TouchableOpacity
        style={launchPadStyles.launchButton}
        onPress={() => navigation.navigate('JourneyLaunchScreen', { id })}
      >
        <Text style={launchPadStyles.launchButtonText}>Launch</Text>
      </TouchableOpacity>
    </View>
  );
};

const noStoryStyles = StyleSheet.create({
  launcher: {
    backgroundColor: 'white',
    width: Dimensions.get('window').width - 20,
    paddingVertical: 15,
    paddingHorizontal: 15,
    marginTop: 10,
    borderRadius: 5,
  },
  noStoryContainer: {
    flexDirection: 'row',
  },
  noStoryText: {
    paddingLeft: 40,
    paddingTop: 5,
    alignItems: 'center',
  },
  noStoryHero: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5
  },
  instructions: {
    fontSize: 17,
  },
  launchButton: {
    backgroundColor: 'grey',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  launchButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
});

const NoStory = () => {
  const getRecommendation = () => {
    console.log('recommendation');
  }

  return (
    <View style={noStoryStyles.launcher}>
      <View style={noStoryStyles.noStoryContainer}>
        <Ionicons name='ios-navigate' size={90} color='lightgrey' />
        <View style={noStoryStyles.noStoryText}>
          <Text style={noStoryStyles.noStoryHero}>No story loaded.</Text>
          <Text style={noStoryStyles.instructions}>Find a story and click {'\n'} 'Read' to load a story.</Text>
        </View>
      </View>
      <TouchableOpacity
        style={noStoryStyles.launchButton}
        onPress={getRecommendation}
      >
        <Text style={noStoryStyles.launchButtonText}>Get Recommendation</Text>
      </TouchableOpacity>
    </View>
  );
};