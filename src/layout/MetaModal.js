import React from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  }
});

export const MetaModal = () => {
  return (
    <View style={styles.container}>
      <Text>Hello World</Text>
    </View>
  );
};