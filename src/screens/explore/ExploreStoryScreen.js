import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

import { Context as StoryContext } from './../../providers/StoryProvider.js';
import { Context as JourneyContext } from './../../providers/JourneyProvider.js';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  title: {
    color: 'rgb(255,50,50)',
    fontSize: 30,
    fontWeight: 'bold',
  },
  body: {

  },
});

export const ExploreStoryScreen = ({ navigation }) => {
  const { state: { stories } } = React.useContext(StoryContext);
  const { state: { journeyId }, clearJourney } = React.useContext(JourneyContext);

  const story = stories.find(s => s._id === '5f03c5837762b01e7616bc9c');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{story?.title}</Text>
      <View>
        <Text style={styles.body}>{story?.body}</Text>
      </View>
    </View>
  );
};