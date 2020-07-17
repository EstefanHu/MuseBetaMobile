import React, { useContext } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity
} from 'react-native';

import { Context as StoryContext } from './../../providers/StoryProvider.js';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: 'rgb(40,40,40)'
  },
  header: {
    color: 'rgb(230,230,230)',
    fontSize: 40,
    fontWeight: 'bold',
    marginTop: 10,
  },
  choices: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  option: {
    width: Dimensions.get('window').width / 2 - 27.5,
    height: Dimensions.get('window').width / 2 - 27.5,
    backgroundColor: 'rgb(60,60,60)',
    borderRadius: 5,
    marginBottom: 15,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  label: {
    color: 'rgb(200,200,200)',
    fontSize: 20,
  }
});

export const CreateStarterScreen = ({ navigation }) => {
  const { state: { newStory }, updateNewStory } = useContext(StoryContext);

  const beginOption = option => {
    updateNewStory({ ...newStory, type: option });
    navigation.navigate('CreatePreliminaryScreen');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Create story.</Text>

      <View style={styles.choices}>
        <TouchableOpacity
          style={styles.option}
          onPress={() => beginOption('text')}
        >
          <Text style={styles.label}>text</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.option}
          onPress={() => beginOption('image')}

        >
          <Text style={styles.label}>image</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.option}
          onPress={() => beginOption('video')}

        >
          <Text style={styles.label}>video</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.option}
          onPress={() => beginOption('audio')}

        >
          <Text style={styles.label}>audio</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.option}
          onPress={() => beginOption('path')}

        >
          <Text style={styles.label}>path</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};