import React, { useState, useEffect, useContext } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Dimensions
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { Context as ProfileContext } from './../../providers/ProfileProvider.js';

import { StoryCard } from './../../components/StoryCard.js';
import { NoStory } from '../../components/NoStory.js';

import ProfileImage from './../../../assets/user-default.png';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  userName: {
    fontSize: 28
  },
  header: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    width: Dimensions.get('window').width,
  },
  profile: {
    flexDirection: 'row'
  },
  profileImage: {
    height: 80,
    width: 80,
    borderColor: 'lightgrey',
    borderWidth: 1,
    borderRadius: 40,
  },
  info: {
    marginLeft: 15,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold'
  },
  storyHolder: {

  }
});

export const ProfileOverviewScreen = ({ navigation }) => {
  const { state: { id, name, stories },
    fetchStories } = useContext(ProfileContext);
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
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.profile}>
          <Image
            style={styles.profileImage}
            source={ProfileImage}
          />
          <View style={styles.info}>
            <Text style={styles.name}>{name}</Text>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate('ProfileUpdateScreen')}>
          <MaterialCommunityIcons name='settings' size={25} color='grey' />
        </TouchableOpacity>
      </View>

      {
        stories.length < 0 ?
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
    </SafeAreaView>
  );
};