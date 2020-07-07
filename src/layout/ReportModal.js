import React, { useContext } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import { Context as StoryContext } from './../providers/StoryProvider.js';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

export const ReportModal = ({ route, navigation }) => {
  const { state: { stories } } = useContext(StoryContext);
  const { storyId } = route.params;

  const story = stories.find(s => s._id === storyId);

  return (
    <View style={styles.container}>
      <Text>Report {story.title}</Text>
    </View>
  );
};