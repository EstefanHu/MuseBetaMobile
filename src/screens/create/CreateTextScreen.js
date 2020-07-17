import React, { useState, useContext } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  SafeAreaView,
  TouchableOpacity
} from 'react-native';

import { Context as StoryContext } from './../../providers/StoryProvider.js';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'space-between',
    backgroundColor: 'rgb(40,40,40)'
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
  action: {
    backgroundColor: 'rgb(255,50,50)',
    width: '100%',
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 3,
    marginTop: 10
  },
  actionText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    textTransform: 'uppercase'
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
  }
});

export const CreateTextScreen = () => {
  const { state: { newStory }, updateNewStory } = useContext(StoryContext);
  const [selected, setSelected] = useState(false);
  const [hasBody, setHasBody] = useState(false);
  const [body, setBody] = useState('');

  const validateForNext = () => {
    updateNewStory({ ...newStory, channel });
    navigation.navigate(`Create${newStory.type}Screen`);
  }

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.header}>Text</Text>
        <Text style={styles.describe}>Add text body.</Text>
      </View>

      <SafeAreaView style={styles.form}>
        <TouchableOpacity>

        </TouchableOpacity>

        <View>
          {
            selected ?
              <View style={styles.field}>
                <Text style={styles.label}>Body:</Text>
                <TextInput
                  underlineColorAndroid='rgba(0,0,0,0)'
                  style={styles.input}
                  multiline
                  numberOfLines={3}
                  maxLength={280}
                  autoCorrect
                  value={body}
                  onChangeText={text => setBody(text)}
                />
              </View>
              : <>
                <TouchableOpacity
                  style={styles.action}
                  onPress={() => setSelected(true)}
                >
                  <Text style={styles.actionText}>Upload</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.action}
                  onPress={() => setSelected(true)}
                >
                  <Text style={styles.actionText}>Write</Text>
                </TouchableOpacity>
              </>
          }


        </View>

        {
          hasBody &&
          <TouchableOpacity
            style={styles.action}
            onPress={validateForNext}
          >
            <Text style={styles.actionText}>Next</Text>
          </TouchableOpacity>
        }
      </SafeAreaView>
    </View >
  );
};