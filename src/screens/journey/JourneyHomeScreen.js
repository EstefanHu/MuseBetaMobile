import React, { useContext } from 'react';
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
  homeFeed: {

  }
});

export const JourneyHomeScreen = ({ navigation }) => {
  const { state: { status } } = useContext(JourneyContext);

  const ref = React.useRef(null);
  useScrollToTop(ref);

  return (
    <SafeAreaView style={styles.container}>
      {
        status === 'docked' ?
          <Launch navigation={navigation} />
          : <View style={styles.launcher}>
            <Text style={styles.launcherHero}>No Story.</Text>
          </View>
      }
      <FlatList
        ref={ref}
      />
    </SafeAreaView >
  );
};

const launchStyles = StyleSheet.create({
  launcher: {
    backgroundColor: 'white',
    width: '100%',
    paddingVertical: 20,
    paddingHorizontal: 30,
    marginTop: 10,
  },
  launchButton: {
    backgroundColor: 'rgb(255,50,50)',
  },
  launchButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20
  }
});

const Launch = ({ navigation }) => {
  const { state: { stories } } = useContext(StoryContext);
  const { state: { storyId } } = useContext(JourneyContext);

  const story = stories.find(s => s._id === storyId);

  return (
    <View style={launchStyles.launcher}>
      <Text>{story.title}</Text>
      <TouchableOpacity
        style={launchStyles.launchButton}
        onPress={() => navigation.navigate('JourneyLaunchScreen', { story })}
      >
        <Text>Launch</Text>
      </TouchableOpacity>
    </View>
  );
};