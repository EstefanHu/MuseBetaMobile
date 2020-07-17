import React, { useContext } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Alert
} from 'react-native';
import {
  FontAwesome,
  MaterialCommunityIcons
} from '@expo/vector-icons';
import { Context as StoryContext } from './../providers/StoryProvider.js';

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
  },
  icon: {
    textAlign: 'center',
    marginTop: 15
  }
});

export const CreateLauncherModal = ({ navigation }) => {
  const { state: { newStory }, updateNewStory } = useContext(StoryContext);

  const beginOption = option => {
    updateNewStory({ ...newStory, type: option });
    navigation.navigate('CreateStack');
  }

  const underDevelopment = () => Alert.alert(
    'Feature Under Development',
    'Send recommendation to developer?',
    [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Contact',
        onPress: () => navigation.navigate('SettingsStack'),
      }
    ],
    { cancelable: true }
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Create story.</Text>

      <View style={styles.choices}>
        <TouchableOpacity
          style={styles.option}
          onPress={() => beginOption('Text')}
        >
          <Text style={styles.label}>text</Text>
          <FontAwesome
            style={styles.icon}
            name='file-text'
            size={70}
            color='rgb(120,120,120)'
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.option}
          onPress={underDevelopment}
        >
          <Text style={styles.label}>image</Text>
          <FontAwesome
            style={styles.icon}
            name='camera'
            size={70}
            color='rgb(120,120,120)'
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.option}
          onPress={underDevelopment}
        >
          <Text style={styles.label}>video</Text>
          <FontAwesome
            style={styles.icon}
            name='video-camera'
            size={70}
            color='rgb(120,120,120)'
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.option}
          onPress={underDevelopment}
        >
          <Text style={styles.label}>audio</Text>
          <FontAwesome
            style={styles.icon}
            name='microphone'
            size={70}
            color='rgb(120,120,120)'
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.option}
          onPress={underDevelopment}
        >
          <Text style={styles.label}>path</Text>
          <MaterialCommunityIcons
            style={styles.icon}
            name='map-marker-path'
            size={70}
            color='rgb(120,120,120)'
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};