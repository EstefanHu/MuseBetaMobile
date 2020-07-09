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
  container: {

  },
  modal: {
    backgroundColor: 'white',
    width: Dimensions.get('window').width * 0.9,
    paddingTop: 10,
    paddingBottom: 30,
  }
});

export const ExploreStoryModal = () => {

  return (
    <SafeAreaView>
      <View style={styles.modal}>
        <Text>Hellow</Text>
      </View>
    </SafeAreaView>
  )
}