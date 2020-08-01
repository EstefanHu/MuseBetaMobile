import React, { useState, useContext } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CHANNELS } from './../../constants/channels.js';
import { Picker } from '@react-native-community/picker'
import { SafeAreaView } from 'react-native-safe-area-context';

import { Context as StoryContext } from './../../providers/StoryProvider.js';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'space-between',
    backgroundColor: 'rgb(40,40,40)',
    paddingBottom: 10,
  },
  header: {
    color: 'white',
    fontSize: 50,
    fontWeight: 'bold'
  },
  describe: {
    color: 'rgb(220,220,220)',
    fontSize: 20,
  },
  field: {
    paddingBottom: 5,
  },
  label: {
    fontSize: 12,
    marginBottom: 3,
    color: 'white'
  },
  input: {
    fontSize: 18,
    width: '100%',
    color: 'white',
    backgroundColor: 'rgb(60,60,60)',
    borderRadius: 3,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  requestContainer: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  request: {
    marginBottom: 20,
    color: 'rgb(200,200,200)'
  },
  requestLink: {
    color: 'rgb(255,50,50)',
    textDecorationLine: 'underline',
  },
  submit: {
    backgroundColor: 'rgb(255,50,50)',
    width: '100%',
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 3,
    marginTop: 10
  },
  submitText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    textTransform: 'uppercase'
  },
});

export const CreateChannelScreen = ({ navigation }) => {
  const { state: { newStory }, updateNewStory } = useContext(StoryContext);
  const [channel, setChannel] = useState();

  const validateForNext = () => {
    updateNewStory({ ...newStory, channel });
    navigation.navigate(`Create${newStory.type}Screen`);
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'rgb(40,40,40)' }}>
      <View style={styles.container}>
        <View>
          <Ionicons
            style={{ marginLeft: -10, width: 15 }}
            name='ios-arrow-back' size={24} color='white'
            onPress={() => navigation.pop()}
          />
          <Text style={styles.header}>Channel</Text>
          <Text style={styles.describe}>Choose channel to be posted in</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.field}>
            <Text style={styles.label}>Channel:</Text>
            <Picker
              style={styles.input}
              selectedValue={channel}
              itemStyle={{ color: 'white', fontSize: 30 }}
              onValueChange={itemValue => setChannel(itemValue)}
            >
              {
                CHANNELS.map(c => (
                  <Picker.Item
                    key={c.label}
                    label={c.label}
                    value={c.value}
                  />
                ))
              }
            </Picker>
          </View>
          <View style={styles.requestContainer}>
            <Text style={styles.request}>Channel not included?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('SettingsStack')}>
              <Text style={styles.requestLink}> Request another!</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.submit}
            onPress={validateForNext}
          >
            <Text style={styles.submitText}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};