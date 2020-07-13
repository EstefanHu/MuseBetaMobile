import React from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';

const styles = StyleSheet.create({
  container: {

  }
});

export const SupportHomeScreen = ({ navigation }) => {

  return (
    <View style={styles.container}>
      <Text>Hello from Support </Text>
    </View>
  );
};