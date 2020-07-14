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
  launcher: {
    backgroundColor: 'white',
    width: Dimensions.get('window').width - 20,
    paddingVertical: 15,
    paddingHorizontal: 15,
    marginTop: 10,
    borderRadius: 5,
    backgroundColor: 'white',
  },
  launcherHero: {
    color: 'grey',
    fontWeight: 'bold',
    fontSize: 20
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
    fontSize: 25,
    fontWeight: 'bold',
    color: 'grey',
    marginTop: 20,
    marginBottom: 10,
  },
});

export const JourneyHomeScreen = ({ navigation }) => {
  const { state: { status, storyId } } = useContext(JourneyContext);
  const { state: { stories }, fetchNearStories } = useContext(StoryContext);
  const { state: { longitude, latitude }, getCoords } = useContext(LocationContext);
  const [refreshing, setRefreshing] = useState(false);
  const [channel, setChannel] = useState('All');
  const [recommendation, setRecommendation] = useState();

  const story = stories.find(s => s._id === storyId);

  useEffect(() => {
    longitude ?
      fetchNearStories(5, longitude, latitude, 'mi')
      : getCoords();
  }, [longitude]);

  useEffect(() => {
    setRecommendation(
      stories[
      Math.floor(
        Math.random() *
        Math.floor(stories.length)
      )]
    )
  }, [stories]);

  const scroll = React.useRef(null);
  useScrollToTop(scroll);

  const previewMap = React.useRef(null);

  const fitMarkers = () => {
    previewMap.current.fitToSuppliedMarkers([
      {
        latitude: recommendation.startLocation.coordinates[1],
        longitude: recommendation.startLocation.coordinates[0]
      },
      { latitude: latitude, longitude: longitude }
    ])
  }

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchNearStories(5, longitude, latitude, 'mi');
    setRefreshing(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Filter navigation={navigation} channel={channel} setChannel={c => setChannel(c)} />
      <View style={styles.launcher}>
        {
          status === 'docked' ?
            <>
              <Text>{story.title}</Text>

            </>
            : <>
              <Text style={styles.launcherHero}>No story loaded.</Text>
              <Text>Launch recommendation?</Text>
              {
                recommendation && <>
                  <Text>{recommendation && recommendation.title}</Text>
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
                        latitude: recommendation.startLocation.coordinates[1],
                        longitude: recommendation.startLocation.coordinates[0]
                      }}
                    />
                  </MapView>
                </>
              }
            </>
        }
        <TouchableOpacity
          style={styles.launchButton}
          onPress={() => navigation.navigate(
            'JourneyLaunchScreen',
            { story: story ? story : recommendation }
          )}
        >
          <Text style={styles.launchButtonText}>Launch</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        ref={scroll}
        data={stories}
        onRefresh={onRefresh}
        refreshing={refreshing}
        keyExtractor={item => item._id}
        ListHeaderComponent={() => (
          <Text style={styles.hero}>Stories around you</Text>
        )}
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