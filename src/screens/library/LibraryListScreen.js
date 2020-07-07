import React, { useState, useEffect, useContext } from 'react';
import {
  StyleSheet,
  FlatList,
  View,
  Text,
  SafeAreaView,
} from 'react-native';
import { Context as ProfileContext } from '../../providers/ProfileProvider.js'; // TODO: Temp
import { Filter } from '../../components/Filter.js';
import { StoryCard } from '../../components/StoryCard.js';

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

export const LibraryListScreen = ({ navigation }) => {
  const { state: { library }, fetchLibrary } = useContext(ProfileContext);
  const [refreshing, setRefreshing] = useState(false);
  const [channel, setChannel] = useState('All');

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
      <Filter navigation={navigation} channel={channel} setChannel={setChannel} />
      {
        library.length > 0 ?
          <FlatList
            data={library}
            onRefresh={onRefresh}
            refreshing={refreshing}
            keyExtractor={item => item._id}
            renderItem={({ item }) => {
              return item.channel === channel
                || channel == 'All' ?
                <StoryCard
                  navigation={navigation}
                  item={item}
                /> : null
            }}
          />
          : <View><Text>Nothing in your library</Text></View>
      }
    </SafeAreaView>
  )
}