import React, { useState, useContext } from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Context as StoryContext } from './../../providers/StoryProvider.js';
import { Context as LocationContext } from './../../providers/LocationProvider.js';

const styles = StyleSheet.create({
  container: {
    flex: 1
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
});

export const CreateReviewScreen = () => {
  const { state: { newStory } } = useContext(StoryContext);
  const { state: { city } } = useContext(LocationContext);

  const publishStory = () => {
    console.log('publishing');
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
            onPress={publishStory}
          >
            <Text style={styles.publishText}>Publish</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};