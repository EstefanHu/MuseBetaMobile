import React, { useContext } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from 'react-native';

import { Context as StoryContext } from './../../providers/StoryProvider.js';

const styles = StyleSheet.create({
  modal: {
    backgroundColor: 'white',
    width: Dimensions.get('window').width * 0.93,
    paddingTop: 10,
    paddingBottom: 30,
    borderTopEndRadius: 5,
  }
});

export const ExploreStoryModal = ({ route, navigation }) => {
  const { state: { stories } } = useContext(StoryContext);
  const story = stories.find(s => s._id === route.params?.id);

  return (
    <View style={styles.modal}>
      <Text>{story.title}</Text>
    </View>
  )
}