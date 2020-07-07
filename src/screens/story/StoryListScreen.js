import React, { useState, useEffect, useContext } from 'react';
import {
  StyleSheet,
  FlatList,
  SafeAreaView,
} from 'react-native';
import { Context as StoryContext } from '../../providers/StoryProvider.js';
import { Context as LocationContext } from '../../providers/LocationProvider.js';

import { Filter } from '../../components/Filter.js';
import { StoryCard } from '../../components/StoryCard.js';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // marginTop: Constants.statusBarHeight,
  }
});

export const StoryListScreen = ({ navigation }) => {
  const { state: { stories }, fetchStories } = useContext(StoryContext);
  const { state: { city } } = useContext(LocationContext);
  const [refreshing, setRefreshing] = useState(false);
  const [channel, setChannel] = useState('All');

  useEffect(() => {
    if (city)
      fetchStories(city);
  }, [city]);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchStories(city);
    setRefreshing(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Filter navigation={navigation} channel={channel} setChannel={c => setChannel(c)} />
      <FlatList
        data={stories}
        showsVerticalScrollIndicator={false}
        onRefresh={onRefresh}
        refreshing={refreshing}
        keyExtractor={item => item._id}
        renderItem={({ item }) => {
          return item.channel === channel
            || channel === 'All' ?
            <StoryCard
              navigation={navigation}
              item={item}
            /> : null
        }}
      />
    </SafeAreaView>
  )
};