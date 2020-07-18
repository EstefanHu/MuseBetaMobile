import React, { useState, useContext } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';

import { Context as StoryContext } from './../../providers/StoryProvider.js';
import { Context as LocationContext } from './../../providers/LocationProvider.js';
import { SafeAreaView } from 'react-native-safe-area-context';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingBottom: 10,
    backgroundColor: 'rgb(40,40,40)',
    justifyContent: 'space-between',
  },
  header: {
    color: 'white',
    fontSize: 50,
    fontWeight: 'bold'
  },
  coordContainer: {
    paddingTop: 10,
    paddingLeft: 10
  },
  describe: {
    color: 'rgb(220,220,220)',
    fontSize: 20,
  },
  coord: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  mapStyle: {
    width: '100%',
    height: Dimensions.get('window').height * 0.5,
    borderRadius: 5,
    marginTop: 5,
  },
  action: {
    backgroundColor: 'white',
    width: '100%',
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 3,
    marginTop: 10
  },
  actionText: {
    fontWeight: 'bold',
    fontSize: 20,
    textTransform: 'uppercase'
  },
  submit: {
    backgroundColor: 'rgb(255,50,50)',
    width: '100%',
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 3,
    marginTop: 15
  },
  submitText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    textTransform: 'uppercase'
  }
});

export const CreateLocationScreen = ({ navigation }) => {
  const { state: { longitude, latitude } } = useContext(LocationContext);
  const { state: { newStory }, updateNewStory } = useContext(StoryContext);
  const [region, setRegion] = useState({
    longitude: longitude,
    latitude: latitude,
    longitudeDelta: 0.1,
    latitudeDelta: 0.1
  });
  const [storyLongitude, setStoryLongitude] = useState(longitude);
  const [storyLatitude, setStoryLatitude] = useState(latitude);

  const recalculate = () => {

  }

  const validateForNext = () => {
    updateNewStory({
      ...newStory,
      startLocation: {
        type: 'String',
        default: 'Point',
        enum: ['Point']
      },
      coordinates: [storyLongitude, storyLatitude]
    });
    navigation.navigate('CreateReviewScreen');
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'rgb(40,40,40)' }}>
      <View style={styles.container}>
        <View>
          <Ionicons
            style={{ marginLeft: -10, width: 15 }}
            name='ios-arrow-back' size={24} color='white'
            onPress={() => navigation.pop()}
          />
          <Text style={styles.header}>Coordinates</Text>
          <Text style={styles.describe}>Choose where to plot story</Text>
        </View>

        <View>
          <MapView
            style={styles.mapStyle}
            region={region}
            onRegionChange={() => setRegion()}
            mapType={"mutedStandard"}
            pitchEnabled
            rotateEnabled
            showsScale
            loadingEnabled
            compassOffset={{ x: -5, y: 5 }}
          >
            <View style={styles.coordContainer}>
              <Text style={styles.coord}>Lat: {storyLatitude}</Text>
              <Text style={styles.coord}>Long: {storyLongitude}</Text>
            </View>
            <Marker
              coordinate={{
                latitude: storyLatitude,
                longitude: storyLongitude
              }}
            />
          </MapView>
          <TouchableOpacity
            style={styles.action}
            onPress={() => null}
          >
            <Text style={styles.actionText}>Replot</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.submit}
          onPress={validateForNext}
        >
          <Text style={styles.submitText}>Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};