import React from 'react';
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
  FontAwesome,
  Entypo
} from '@expo/vector-icons';
import Mapview, { Marker } from 'react-native-maps';
import { getProfileImage } from './../constants/network.js';

import { Context as ProfileContext } from './../providers/ProfileProvider.js';
import { Context as SearchContext } from '../providers/SearchProvider.js';
import { Context as LocationContext } from './../providers/LocationProvider.js';

import DefaultImage from './../../assets/user-default.png';
import { useDateFormat } from '../hooks/useDateFormat.js';

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    width: Dimensions.get('window').width * 0.95,
    paddingVertical: 15,
    borderRadius: 5,
    marginTop: 10,
    paddingHorizontal: 15,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    fontSize: 16,
  },
  metaContainer: {
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
          source={item.photo
            ? getProfileImage + '/' + item.photo
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
      <Text style={styles.meta}>{useDateFormat(item.createdAt)}</Text>
    </View>

    <MapPreview
      longitude={item.startLocation.coordinates[0]}
      latitude={item.startLocation.coordinates[1]}
    />

    <View style={styles.actions}>
      <View style={styles.actionsWrapper}>
        <ReadButton storyRef={item} />
        <SaveButton id={item._id} />
      </View>
    </View>
  </View>
);

const mapStyles = StyleSheet.create({
  container: {
    height: 200,
    width: '100%',
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 20,
  }
});

const MapPreview = ({ storyLongitude, storyLatitude }) => {
  const previewMap = React.useRef(null);
  const { state: { longitude, latitude } } = React.useContext(LocationContext)

  React.useEffect(() => fitMarkers(), [longitude, previewMap]);

  const fitMarkers = () => {
    const MARKERS = [
      { latitude: storyLatitude, longitude: storyLongitude },
      { latitude: latitude, longitude: longitude }
    ]
    const OPTIONS = {
      edgePadding: {
        top: 40,
        right: 60,
        bottom: 30,
        left: 60
      }
    }
    previewMap.current.fitToCoordinates(MARKERS, OPTIONS);
  }

  return (
    <View style={mapStyles.container}>
      <Mapview
        style={{ height: '100%', width: '100%' }}
        ref={previewMap}
        initialRegion={{
          longitude,
          latitude,
          longitudeDelta: 0.1,
          latitudeDelta: 0.1
        }}
        mapType={'mutedStandard'}
        showsUserLocation
        scrollEnabled={false}
        pitchEnabled={false}
        rotateEnabled={false}
        scrollEnabled={false}
        zoomEnabled={false}
      >
        <Marker coordinate={{ latitude, longitude }}>
          <Entypo
            name='location-pin'
            size={30}
            color='black'
          />
        </Marker>
      </Mapview>
    </View>
  );
};

const ReadButton = ({ storyRef }) => {
  const { state: { storyId }, setStory, clearStory } = React.useContext(SearchContext);
  const [isDocked, setIsDocked] = React.useState(false);

  React.useEffect(() => {
    setIsDocked(storyRef._id === storyId)
  }, [storyId]);

  return isDocked ?
    <TouchableOpacity onPress={clearStory}>
      <View style={styles.button} >
        <Feather name='book-open' size={22} color='grey' />
        <Text>  Read</Text>
      </View>
    </TouchableOpacity >
    : <TouchableOpacity onPress={() => setStory(storyRef._id)}>
      <View style={styles.button}>
        <Feather name='book' size={22} color='grey' />
        <Text>  Read</Text>
      </View>
    </TouchableOpacity>
};

const SaveButton = ({ id }) => {
  const { state: { libraryIds }, addToLibrary, removeFromLibrary } = React.useContext(ProfileContext);
  const [isSaved, setIsSaved] = React.useState(false);

  React.useEffect(() => {
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
};