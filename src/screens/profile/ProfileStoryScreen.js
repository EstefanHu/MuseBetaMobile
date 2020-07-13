import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  RefreshControl,
  ScrollView
} from 'react-native';

import { Context as ProfileContext } from './../../providers/ProfileProvider.js';

import { StoryCard } from './../../components/StoryCard.js';
import { NoStory } from './../../components/NoStory.js';

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
    <ScrollView
      style={{flex: 1}}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
    >
      <View style={{ alignItems: 'center' }}>
        {
          stories.length > 0 ?
            stories.map(item =>
              <StoryCard
                key={item._id}
                navigation={navigation}
                item={item}
              />
            )
            : <NoStory
              navigation={navigation}
              action={'Create First!'}
              url={'CreateStoryModal'}
            />
        }
      </View>
    </ScrollView>
  );
};