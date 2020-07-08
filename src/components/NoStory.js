import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  noStoryButton: {
    backgroundColor: 'rgb(255, 50, 50)',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  noStoryLabel: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  }
});

export const NoStory = ({ navigation, action, url }) => (
  <View style={styles.container}>
    <Text style={styles.text}>No Stories.</Text>
    <TouchableOpacity onPress={() => navigation.navigate(url)}>
      <View style={styles.noStoryButton}>
        <Text style={styles.noStoryLabel}>{action}</Text>
      </View>
    </TouchableOpacity>
  </View>
);