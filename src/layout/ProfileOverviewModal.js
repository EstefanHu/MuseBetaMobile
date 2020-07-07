import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export const ProfileOverviewModal = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Profile</Text>
      <TouchableOpacity onPress={() => navigation.pop()}>
        <Text>Back</Text>
      </TouchableOpacity>
    </View>
  )
}