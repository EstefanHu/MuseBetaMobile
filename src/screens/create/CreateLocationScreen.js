import React, { useState, useContext } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Platform
} from 'react-native';
import {
  Ionicons,
  Entypo
} from '@expo/vector-icons';
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
  const previewMap = React.useRef(null);
  const { state: { longitude, latitude, city, zip }, getCoords } = useContext(LocationContext);
  const { state: { newStory }, updateNewStory } = useContext(StoryContext);
  const [region, setRegion] = useState({
    longitude: longitude,
    latitude: latitude,
    longitudeDelta: 0.1,
    latitudeDelta: 0.1
  });

  const replot = async () => {
    await getCoords();
    previewMap.current.animateToRegion(
      {
        longitude,
        latitude,
        longitudeDelta: 0.08,
        latitudeDelta: 0.08
      },
      1200
    );
  }

  const validateForNext = () => {
    updateNewStory({
      ...newStory,
      startLocation: {
        coordinates: [longitude, latitude]
      }, city, zip
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
            ref={previewMap}
            region={region}
            onRegionChange={() => setRegion()}
            mapType={"mutedStandard"}
            pitchEnabled
            rotateEnabled
            showsScale
            loadingEnabled
            compassOffset={{ x: -5, y: 5 }}
          >
            {
              Platform.OS == 'ios' ? <View style={styles.coordContainer}>
                <Text style={styles.coord}>Lat: {latitude}</Text>
                <Text style={styles.coord}>Long: {longitude}</Text>
              </View> : null
            }
            <Marker coordinate={{
              latitude: latitude,
              longitude: longitude
            }}>
              <Entypo
                name='location-pin'
                size={30}
                color='black'
              />
            </Marker>
          </MapView>
          <TouchableOpacity
            style={styles.action}
            onPress={replot}
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