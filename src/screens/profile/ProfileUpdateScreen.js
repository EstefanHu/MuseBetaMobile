import React from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

export const ProfileUpdateScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Update</Text>
    </View>
  )
}