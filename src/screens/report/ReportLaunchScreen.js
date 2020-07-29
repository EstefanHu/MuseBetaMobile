import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import MapView from 'react-native-maps';

const styles = StyleSheet.create({
  container: {

  }
});

export const ReportLaunchScreen = () => {

  return (
    <View style={styles.container}>

      <View style={styles.section}>
        <Text style={styles.label}>Location</Text>
        <TouchableOpacity>
        </TouchableOpacity>
      </View>
    </View>
  );
};