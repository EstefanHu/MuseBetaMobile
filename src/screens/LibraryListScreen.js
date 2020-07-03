import React, { useState, useEffect, useContext } from 'react';
import {
  StyleSheet,
  FlatList,
  SafeAreaView,
} from 'react-native';
import { Context as LibraryContext } from './../providers/LibraryProvider.js'; // TODO: Temp
import { Filter } from './../components/Filter.js';
import { StoryCard } from './../components/StoryCard.js';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // marginTop: Constants.statusBarHeight,
  }
});

const wait = (timeout) => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
};

export const LibraryListScreen = ({ navigation, route }) => {
  const { state: { library }, fetchLibrary } = useContext(LibraryContext);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchLibrary();
  }, []);

  // const onRefresh = () => {
  //   setRefreshing(true);
  //   refreshFeed(() => setRefreshing(false));
  // }

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    wait(2000).then(() => setRefreshing(false));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Filter navigation={navigation} />
      <FlatList
        data={library}
        onRefresh={onRefresh}
        refreshing={refreshing}
        keyExtractor={item => item._id}
        renderItem={({ item }) => {
          return item.genre === route.params.genre
            || route.params.genre == 'All' ?
            <StoryCard
              navigation={navigation}
              item={item}
            /> : null
        }}
      />
    </SafeAreaView>
  )
}