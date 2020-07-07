import React, { useContext } from 'react';
import {
  Stylesheet,
  View,
  Text,
} from 'react-native';
import { Context as StoryContext } from '../../providers/StoryProvider.js';

export const StoryDetailScreen = ({ route }) => {
  const { state: { stories } } = useContext(StoryContext);
  const id = route.params?._id;

  const story = stories.find(s => s._id === id);
  const initialCoords = story.startLocation;


  return (
    <View>
      <Text>{story.title}</Text>
    </View>
  )
}