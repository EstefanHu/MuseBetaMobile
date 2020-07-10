import React, { useState, useEffect, useContext } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  TouchableWithoutFeedback,
  ScrollView
} from 'react-native';

import { Context as StoryContext } from './../../providers/StoryProvider.js';

const styles = StyleSheet.create({
  scroll: {

  },
  back: {
    height: Dimensions.get('window').height * 0.7,
    width: Dimensions.get('window').width,
  },
  modal: {
    backgroundColor: 'white',
    width: Dimensions.get('window').width * 0.93,
    minHeight: Dimensions.get('window').height,
    paddingTop: 10,
    paddingBottom: 30,
    borderTopEndRadius: 5,
  }
});

export const ExploreStoryModal = ({ route, navigation }) => {
  const { state: { stories }, fetchSingleStory } = useContext(StoryContext);
  const { id } = route.params;
  const story = stories.find(s => s._id === id);

  useEffect(() => {
    fetchSingleStory(id);
  }, [id]);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <TouchableWithoutFeedback onPress={() => navigation.pop()}>
        <View style={styles.back} />
      </TouchableWithoutFeedback>
      <View style={styles.modal}>
        <Text>{story.title}</Text>
      </View>
    </ScrollView>
  )
}