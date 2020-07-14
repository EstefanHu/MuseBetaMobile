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
  placeholder: {
    backgroundColor: 'rgb(240,240,240)',
    width: Dimensions.get('window').width - 20,
    paddingVertical: 15,
    paddingHorizontal: 15,
    marginTop: 10,
    borderRadius: 5,
  },
  launcher: {
    backgroundColor: 'white',
    width: Dimensions.get('window').width - 20,
    paddingVertical: 15,
    paddingHorizontal: 15,
    marginTop: 10,
    borderRadius: 5,
  },
  launcherHero: {
    color: 'grey',
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 10
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
  hero: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'grey',
    marginTop: 15,
  },
});

export const JourneyHomeScreen = ({ navigation }) => {
  const { state: { status, storyId } } = useContext(JourneyContext);
  const { state: { stories }, fetchNearStories } = useContext(StoryContext);
  const { state: { longitude, latitude }, getCoords } = useContext(LocationContext);
  const [refreshing, setRefreshing] = useState(false);
  const [channel, setChannel] = useState('All');

  const [dockedStory, setDockedStory] = useState();

  useEffect(() => {
    longitude ?
      fetchNearStories(5, longitude, latitude, 'mi')
      : getCoords();
  }, [longitude]);

  useEffect(() => {
    let displayStory;
    storyId ?
      displayStory = stories.find(s => s._id === storyId)
      : displayStory = stories[
      Math.floor(
        Math.random() *
        Math.floor(stories.length)
      )]
    setDockedStory(displayStory);
  }, [stories, storyId]);

  const scroll = React.useRef(null);
  useScrollToTop(scroll);

  const previewMap = React.useRef(null);

  const fitMarkers = () => {
    const MARKERS = [
      {
        latitude: dockedStory.startLocation.coordinates[1],
        longitude: dockedStory.startLocation.coordinates[0]
      },
      { latitude: latitude, longitude: longitude }
    ]
    const EDGE_PADDING = {
      edgePadding: {
        top: 30,
        right: 60,
        bottom: 30,
        left: 60
      }
    }
    previewMap.current.fitToCoordinates(MARKERS, EDGE_PADDING);
  }

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchNearStories(5, longitude, latitude, 'mi');
    setRefreshing(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Filter navigation={navigation} channel={channel} setChannel={c => setChannel(c)} />
      <FlatList
        ref={scroll}
        data={stories}
        onRefresh={onRefresh}
        refreshing={refreshing}
        keyExtractor={item => item._id}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          () => <>
            <Text style={styles.launcherHero}>
              {status === 'docked' ? 'Story loaded!' : 'No story loaded.'}
            </Text>

            {
              dockedStory ?
                <View style={styles.launcher}>
                  <Text>Launch recommendation?</Text>
                  <Text>{dockedStory.title}</Text>
                  <MapView
                    style={styles.mapStyle}
                    ref={previewMap}
                    initialRegion={{
                      longitude: longitude,
                      latitude: latitude,
                      longitudeDelta: 0.1,
                      latitudeDelta: 0.1
                    }}
                    showsUserLocation
                    scrollEnabled={false}
                    onMapReady={fitMarkers}
                  >
                    <Marker
                      coordinate={{
                        latitude: dockedStory.startLocation.coordinates[1],
                        longitude: dockedStory.startLocation.coordinates[0]
                      }}
                    />
                  </MapView>
                  <TouchableOpacity
                    style={styles.launchButton}
                    onPress={() => navigation.navigate(
                      'JourneyLaunchScreen',
                      { story: dockedStory }
                    )}
                  >
                    <Text style={styles.launchButtonText}>Launch</Text>
                  </TouchableOpacity>
                </View>
                : <View style={styles.placeholder} />
            }
            <Text style={styles.hero}>Stories around you</Text>
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