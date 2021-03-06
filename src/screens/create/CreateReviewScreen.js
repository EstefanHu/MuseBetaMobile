import React, { useState, useContext } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Context as StoryContext } from './../../providers/StoryProvider.js';
import { Context as LocationContext } from './../../providers/LocationProvider.js';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'space-between',
    backgroundColor: 'rgb(40,40,40)',
    paddingBottom: 10,
  },
  header: {
    color: 'white',
    fontSize: 50,
    fontWeight: 'bold'
  },
  describe: {
    color: 'rgb(220,220,220)',
    fontSize: 20,
  },
  publish: {
    backgroundColor: 'rgb(255,50,50)',
    width: '100%',
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 3,
    marginTop: 10
  },
  publishText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    textTransform: 'uppercase'
  },
});

export const CreateReviewScreen = ({ navigation }) => {
  const { state: { newStory }, publishStory } = useContext(StoryContext);
  const { state: { city } } = useContext(LocationContext);

  const postStory = () => {
    publishStory(newStory);
    navigation.navigate('BottomTabs');
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'rgb(40,40,40)' }}>
      <View style={styles.container}>
        <View>
          <Ionicons
            style={{ marginLeft: -10, width: 15 }}
            name='ios-arrow-back' size={24} color='white'
            onPress={() => navigation.pop()}
          />
          <Text style={styles.header}>Review & Publish</Text>
          <Text style={styles.describe}>Submit story to {city}</Text>
        </View>

        <View>
          <TouchableOpacity
            style={styles.publish}
            onPress={postStory}
          >
            <Text style={styles.publishText}>Publish</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};