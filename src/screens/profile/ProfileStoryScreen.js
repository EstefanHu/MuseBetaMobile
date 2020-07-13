import React, { useState, useEffect, useContext } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  FlatList,
} from 'react-native';

import { Context as ProfileContext } from './../../providers/ProfileProvider.js';


import { StoryCard } from './../../components/StoryCard.js';
import { NoStory } from './../../components/NoStory.js';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  }
});

export const ProfileStoryScreen = ({ navigation }) => {
  const { state: { id, stories }, fetchStories } = useContext(ProfileContext);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchStories(id);
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchStories(id);
    setRefreshing(false);
  }

  return (
    <View style={styles.container}>
      {
        stories.length > 0 ?
          <FlatList
            data={stories}
            onRefresh={onRefresh}
            refreshing={refreshing}
            keyExtractor={item => item._id}
            renderItem={({ item }) =>
              <StoryCard
                navigation={navigation}
                item={item}
              />
            }
          />
          : <NoStory
            navigation={navigation}
            action={'Create First!'}
            url={'CreateStoryModal'}
          />
      }
    </View>
  );
};