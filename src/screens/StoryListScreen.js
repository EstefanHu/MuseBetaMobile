import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { GENRES } from './../constants/genre.js';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    paddingVertical: 10,
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 1,
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

export const StoryListScreen = () => {
  return (
    <View>
      <Filter />
      <Text>Hello from StoryListScreen</Text>
    </View>
  )
}

const Filter = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal={true}
        style={styles.scroll}
        showsHorizontalScrollIndicator={false}
      >
        {GENRES.map(item => (
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              navigation.navigate('Home', { genre: children })}
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