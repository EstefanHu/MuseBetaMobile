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
    paddingVertical: 20,
    paddingHorizontal: 30,
    marginTop: 10,
    borderRadius: 5,
    backgroundColor: 'white',
  },
  launcherHero: {
    color: 'grey',
    fontWeight: 'bold',
    fontSize: 20
  },
  launchButton: {
    backgroundColor: 'rgb(255,50,50)',
  },
  launchButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20
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
      Math.floor(
        Math.random() *
        Math.floor(stories.length)
      ))
  }, [stories]);

  const ref = React.useRef(null);
  useScrollToTop(ref);

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
              <TouchableOpacity
                style={styles.launchButton}
                onPress={() => navigation.navigate('JourneyLaunchScreen', { story })}
              >
                <Text>Launch</Text>
              </TouchableOpacity>
            </>
            : <>
              <Text style={styles.launcherHero}>No story loaded.</Text>
              <Text>Launch recommendation?</Text>
              <Text>{recommendation && stories[recommendation].title}</Text>
            </>
        }
      </View>
      <FlatList
        ref={ref}
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