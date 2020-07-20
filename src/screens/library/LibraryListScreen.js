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

export const LibraryListScreen = ({ navigation }) => {
  const { state: { library, libraryIds }, fetchLibrary } = useContext(ProfileContext);
  const [refreshing, setRefreshing] = useState(false);
  const [channel, setChannel] = useState('All');

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchLibrary();
    setRefreshing(false);
  }

  return (
    <SafeAreaView style={styles.container}>
      <Filter navigation={navigation} channel={channel} setChannel={setChannel} />
      {
        libraryIds.length > 0 ?
          <FlatList
            data={library}
            onRefresh={onRefresh}
            showsVerticalScrollIndicator={false}
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