import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
  },
  modal: {
    backgroundColor: 'white',
    paddingVertical: 20,
    borderRadius: 10,
  },
  cancel: {
    borderTopWidth: 1,
    borderTopColor: 'lightgrey',
    paddingHorizontal: 30
  }
});

export const StoryCardModal = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.modal}>
        <TouchableOpacity onPress={() => navigation.pop()}>
          <Text style={styles.cancel}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};