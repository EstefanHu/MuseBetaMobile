import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  doneButton: {
    marginTop: 40,
    backgroundColor: 'rgb(220,220,220)',
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  doneText: {
    fontWeight: 'bold',
    fontSize: 22,
  }
});

export const ExploreNodeScreen = ({ navigation }) => {

  return (
    <View style={styles.container}>
      <Text>Node</Text>

      <TouchableOpacity
        style={styles.doneButton}
        onPress={() => navigation.pop()}
      >
        <Text style={styles.doneText}>Done</Text>
      </TouchableOpacity>
    </View>
  );
};