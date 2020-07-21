import React, { useState, useEffect, useContext } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import {
  Feather,
  FontAwesome
} from '@expo/vector-icons';
import { getProfileImage } from './../constants/network.js';

import { Context as ProfileContext } from './../providers/ProfileProvider.js';
import { Context as JourneyContext } from '../providers/NearProvider.js';

import DefaultImage from './../../assets/user-default.png';

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    width: Dimensions.get('window').width * 0.95,
    paddingVertical: 15,
    borderRadius: 5,
    marginTop: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    marginBottom: 5
  },
  meta: {
    color: 'grey',
    flexDirection: 'row'
  },
  profileImg: {
    height: 30,
    width: 30,
    borderWidth: 1,
    borderColor: 'lightgrey',
    borderRadius: 15,
    marginRight: 10
  },
  author: {
    fontWeight: 'bold',
    fontSize: 13,
  },
  geolocation: {
    fontSize: 13,
  },
  prime: {
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 3
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    width: 250,
  },
  channel: {},
  pitch: {
    paddingHorizontal: 15,
    fontSize: 16,
  },
  metaContainer: {
    paddingHorizontal: 15,
    flexDirection: 'row',
    marginVertical: 5,
  },
  actions: {
    alignItems: 'center',
  },
  actionsWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 200,
  },
  button: {
    backgroundColor: 'rgb(245,245,245)',
    borderBottomWidth: 1,
    borderColor: 'lightgrey',
    borderRadius: 5,
    height: 45,
    width: 90,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export const StoryCard = ({ navigation, item }) => (
  <View style={styles.card}>

    <View style={styles.header}>
      <View style={styles.meta}>
        <Image
          style={styles.profileImg}
          source={
            item.photo ? getProfileImage + '/' + item.photo
              : DefaultImage
          }
        />
        <View>
          <TouchableOpacity>
            <Text style={styles.author}>{item.authorName}</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.geolocation}>{item.city}, {item.community}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate('StoryCardModal', { storyId: item._id })}>
        <Text>...</Text>
      </TouchableOpacity>
    </View>

    <View style={styles.prime}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.channel}>{item.channel}</Text>
    </View>

    <Text style={styles.pitch}>{item.pitch}</Text>

    <View style={styles.metaContainer}>
      <Text style={styles.meta}>{Date.now()}</Text>
    </View>

    <View style={styles.actions}>
      <View style={styles.actionsWrapper}>
        <ReadButton storyRef={item} />
        <SaveButton id={item._id} />
      </View>
    </View>
  </View>
);

const ReadButton = ({ storyRef }) => {
  const { state: { story }, dockStory, clearDock } = useContext(JourneyContext);
  const [isDocked, setIsDocked] = useState(false);

  useEffect(() => {
    setIsDocked(storyRef === story)
  }, [story]);

  return isDocked ?
    <TouchableOpacity onPress={clearDock}>
      <View style={styles.button} >
        <Feather name='book-open' size={22} color='grey' />
        <Text>  Read</Text>
      </View>
    </TouchableOpacity >
    : <TouchableOpacity onPress={() => dockStory(storyRef)}>
      <View style={styles.button}>
        <Feather name='book' size={22} color='grey' />
        <Text>  Read</Text>
      </View>
    </TouchableOpacity>
};

const SaveButton = ({ id }) => {
  const { state: { libraryIds }, addToLibrary, removeFromLibrary } = useContext(ProfileContext);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    setIsSaved(libraryIds.includes(id));
  }, [libraryIds]);

  const saveStory = async story => {
    await addToLibrary(story);
    setIsSaved(true);
  }

  const removeStory = async id => {
    removeFromLibrary(id);
    setIsSaved(false);
  }

  return isSaved ?
    <TouchableOpacity onPress={() => removeStory(id)}>
      <View style={styles.button}>
        <FontAwesome name='bookmark' size={22} color='grey' />
        <Text>  Remove</Text>
      </View>
    </TouchableOpacity>
    : <TouchableOpacity onPress={() => saveStory(id)}>
      <View style={styles.button}>
        <FontAwesome name='bookmark-o' size={22} color='grey' />
        <Text>  Save</Text>
      </View>
    </TouchableOpacity>
}