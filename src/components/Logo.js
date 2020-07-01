import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';

const styles = StyleSheet.create({
  logo: {
    color: 'rgb(255, 50, 50)',
    fontWeight: 'bold',
    fontSize: 25,
    marginLeft: 14,
  }
})

export const Logo = () => (
  <TouchableOpacity>
    <View>
      <Text style={styles.logo}>:Muse</Text>
    </View>
  </TouchableOpacity>
)