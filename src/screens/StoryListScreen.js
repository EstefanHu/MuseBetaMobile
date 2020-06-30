import React, { useEffect, useContext } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { GENRES } from './../constants/genre.js';
import { Context as StoryContext } from './../providers/StoryProvider.js';

import { StoryCard } from './../components/StoryCard.js';

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

export const StoryListScreen = ({ navigation }) => {
  const { state: { stories }, fetchStories } = useContext(StoryContext);

  useEffect(() => {
    fetchStories('Seattle');
  }, []);

  return (
    <View>
      <Filter navigation={navigation} />
      <FlatList
        data={stories}
        keyExtractor={item => item._id}
        renderItem={({ item }) => {
          return <StoryCard item={item} />
        }}
      />
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
            key={item.label}
            style={styles.button}
            onPress={() =>
              navigation.navigate('Home', { genre: item.value })}
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