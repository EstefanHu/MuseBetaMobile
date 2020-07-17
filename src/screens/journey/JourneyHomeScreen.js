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
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';

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
  const { state: { story }, dockStory } = useContext(JourneyContext);
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

  const getRecommendation =
    () => dockStory(stories[Math.floor(
      Math.random() *
      Math.floor(stories.length)
    )]);

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
              story ?
                <LaunchPad
                  navigation={navigation}
                  longitude={longitude}
                  latitude={latitude}
                />
                : <NoStory getRecommendation={getRecommendation} />
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
  title: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: 'bold'
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

const LaunchPad = ({ navigation, longitude, latitude }) => {
  const { state: { story } } = useContext(JourneyContext);
  const previewMap = React.useRef(null);

  useEffect(() => fitMarkers(), [story, previewMap]);

  const fitMarkers = () => {
    const MARKERS = [
      {
        latitude: story.startLocation.coordinates[1],
        longitude: story.startLocation.coordinates[0]
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
      <Text style={launchPadStyles.title}>{story.title}</Text>
      <MapView
        style={launchPadStyles.mapStyle}
        ref={previewMap}
        initialRegion={{
          longitude: longitude,
          latitude: latitude,
          longitudeDelta: 0.1,
          latitudeDelta: 0.1
        }}
        scrollEnabled={false}
        pitchEnabled={false}
        rotateEnabled={false}
        scrollEnabled={false}
        zoomEnabled={false}
      >
        <Marker
          coordinate={{
            latitude: story.startLocation.coordinates[1],
            longitude: story.startLocation.coordinates[0]
          }}
        />
        <Marker coordinate={{ latitude, longitude }}>
          <FontAwesome5 name='walking' size={20} color='black' />
        </Marker>
      </MapView>
      <TouchableOpacity
        style={launchPadStyles.launchButton}
        onPress={() => navigation.navigate('JourneyNavigationScreen')}
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

const NoStory = ({ getRecommendation }) => (
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