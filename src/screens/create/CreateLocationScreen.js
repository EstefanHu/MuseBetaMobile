import React, { useState, useEffect, useContext } from 'react';
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
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  mapStyle: {
    width: 200,
    height: 300,
    borderRadius: 5,
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

  const validateForNext = () => {
    updateNewStory({ ...newStory, title, pitch });
    // navigation.navigate('');
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'rgb(40,40,40)' }}>
      <View style={styles.container}>
        <Ionicons
          style={{ marginLeft: -10 }}
          name='ios-arrow-back' size={24} color='white'
          onPress={() => navigation.pop()}
        />
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
          <Marker
            coordinate={{ latitude, longitude }}
          />
        </MapView>
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