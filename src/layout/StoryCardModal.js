import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  SafeAreaView
} from 'react-native';
import {
  MaterialCommunityIcons
} from '@expo/vector-icons';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modal: {
    width: Dimensions.get('window').width,
    backgroundColor: 'white',
    paddingVertical: 10,
  },
  options: {
    justifyContent: 'space-evenly',
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 1,
  },
  optionButton: {
    paddingHorizontal: 15,
    paddingVertical: 6,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionLabel: {
    fontSize: 18,
    marginLeft: 30,
  },
});

export const StoryCardModal = ({ route, navigation }) => {
  const { storyId } = route.params;
  const SIZE = 30;
  const COLOR = 'grey';

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.modal}>
        <View style={styles.options}>
          <TouchableOpacity onPress={() => navigation.navigate('ReportModal', { storyId })}>
            <View style={styles.optionButton}>
              <MaterialCommunityIcons name='share' size={SIZE} color={COLOR} />
              <Text style={styles.optionLabel}>Share</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('ReportModal', { storyId })}>
            <View style={styles.optionButton}>
              <MaterialCommunityIcons name='flag' size={SIZE} color={COLOR} />
              <Text style={styles.optionLabel}>Report</Text>
            </View>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => navigation.pop()}>
          <View style={styles.optionButton}>
            <MaterialCommunityIcons name='close' size={SIZE} color={COLOR} />
            <Text style={styles.optionLabel}>Cancel</Text>
          </View>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
};