import React from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  StyleSheet
} from 'react-native';
import { GENRES } from './../constants/genre.js';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    paddingVertical: 10,
  },
  scroll: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 5,
  },
  button: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'lightgrey',
    marginHorizontal: 5,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  content: {
    fontSize: 14,
    color: 'black',
  }
});

export const Filter = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal={true}
        style={styles.scroll}
        showsHorizontalScrollIndicator={false}
      >
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate('StoryListScreen', { genre: 'All' })}
        >
          <Text style={styles.content}>All</Text>
        </TouchableOpacity>
        {GENRES.map(item => (
          <TouchableOpacity
            key={item.label}
            style={styles.button}
            onPress={() =>
              navigation.navigate('StoryListScreen', { genre: item.value })}
          >
            <Text style={styles.content}>
              {item.value}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View >
  );
};