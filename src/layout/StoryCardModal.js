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
  },
  modal: {
    backgroundColor: 'white',
    paddingVertical: 10,
    borderRadius: 10,
  },
  options: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingHorizontal: 20
  },
  optionButton: {
    paddingHorizontal: 10,
    paddingVertical: 6
  },
  report: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 26
  },
  cancel: {
    borderTopWidth: 1,
    borderTopColor: 'lightgrey',
    paddingHorizontal: 30
  }
});

export const StoryCardModal = ({ route, navigation }) => {
  const { storyId } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.modal}>
        <View style={styles.options}>
          <TouchableOpacity onPress={() => navigation.navigate('ReportModal', { storyId })}>
            <View style={styles.optionButton}>
              <Text style={styles.report}>Report</Text>
            </View>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => navigation.pop()}>
          <Text style={styles.cancel}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};