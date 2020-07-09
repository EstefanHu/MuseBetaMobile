import React, { useState, useEffect, useContext } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';

import { Context as LocationContext } from './../../providers/LocationProvider.js';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgb(255,50,50)',
  },
  status: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  label: {
    fontSize: 20,
  },
  permission: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 24,
    textTransform: 'uppercase'
  },
  next: {
    backgroundColor: 'white',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    width: 200,
    marginBottom: 50
  },
  nextText: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center'
  }
});

export const WelcomeLocationScreen = ({ navigation }) => {
  const { setCoords } = useContext(LocationContext);
  const [isLoading, setIsLoading] = useState(true);
  const [permission, setPermission] = useState('Loading');

  useEffect(() => {
    (async () => {
      const { status } = await Permissions.askAsync(Permissions.LOCATION);

      if (status === 'granted') {
        let location = await Location.getCurrentPositionAsync({});
        setCoords(location);
      }

      setPermission(status)
      setIsLoading(false);
    })();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.status}>
        <Text style={styles.label}>Location Permission:</Text>
        {
          isLoading ? <ActivityIndicator size='large' />
            : <View>
              <Text style={styles.permission}>{permission}</Text>
            </View>
        }
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('WelcomeImageScreen')}>
        <View style={styles.next}>
          <Text style={styles.nextText}>Next</Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};