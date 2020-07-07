import React from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export const CreateStoryModal = () => {
  return (
    <View style={styles.container}>
      <Text>Hello</Text>
    </View>
  );
};