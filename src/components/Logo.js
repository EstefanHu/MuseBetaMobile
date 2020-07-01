import React from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

const styles = StyleSheet.create({
  logo: {
    color: 'rgb(255, 50, 50)',
    fontWeight: 'bold',
    fontSize: 25,
    marginLeft: 15,
  }
})

export const Logo = () => (
  <View>
    <Text style={styles.logo}>:Muse</Text>
  </View>
);