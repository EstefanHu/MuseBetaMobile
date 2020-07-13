import React, { useState, useContext } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  FlatList
} from 'react-native';
import { useScrollToTop } from '@react-navigation/native';

import { Context as JourneyContext } from './../../providers/JourneyProvider.js';
import { Context as StoryContext } from './../../providers/StoryProvider.js';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  launcher: {
    backgroundColor: 'white',
    width: '100%',
    paddingVertical: 20,
    paddingHorizontal: 30,
    marginTop: 10,
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
  const { state: { stories } } = useContext(StoryContext);
  const [refreshing, setRefreshing] = useState(false);

  const story = stories.find(s => s._id === storyId);

  const ref = React.useRef(null);
  useScrollToTop(ref);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchStories(city);
    setRefreshing(false);
  };

  return (
    <SafeAreaView style={styles.container}>
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
            : <Text style={styles.launcherHero}>No Story.</Text>
        }
      </View>
      <Text style={styles.hero}>Stories around you</Text>
      <FlatList
        ref={ref}
        onRefresh={onRefresh}
        refreshing={refreshing}
        keyExtractor={item => item._id}
        renderItem={({ item }) => {
          <Text>Hello World</Text>
        }}
      />
    </SafeAreaView >
  );
};