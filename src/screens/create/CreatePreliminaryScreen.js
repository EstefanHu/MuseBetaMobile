import React, { useState, useContext } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Context as StoryContext } from './../../providers/StoryProvider.js';
import { Ionicons } from '@expo/vector-icons';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'space-between',
    paddingBottom: 10,
  },
  form: {
    flexGrow: 2,
    justifyContent: 'flex-end',
  },
  header: {
    color: 'white',
    fontSize: 50,
    fontWeight: 'bold',
    marginTop: 5,
  },
  describe: {
    color: 'rgb(220,220,220)',
    fontSize: 18,
  },
  field: {
    paddingBottom: 5,
  },
  label: {
    fontSize: 15,
    color: 'rgb(250,250,250)',
    marginBottom: 3
  },
  input: {
    fontSize: 20,
    width: '100%',
    color: 'white',
    backgroundColor: 'rgb(60,60,60)',
    borderRadius: 3,
    paddingVertical: 8,
    paddingHorizontal: 13,
  },
  count: {
    color: 'rgb(220,220,220)',
    fontSize: 10,
    textAlign: 'right'
  },
  submit: {
    backgroundColor: 'rgb(255,50,50)',
    width: '100%',
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 3,
    marginTop: 15
  },
  submitText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    textTransform: 'uppercase'
  }
});

export const CreatePreliminaryScreen = ({ navigation }) => {
  const { state: { newStory }, updateNewStory } = useContext(StoryContext);
  const [title, setTitle] = useState('');
  const [pitch, setPitch] = useState('');

  const validateForNext = () => {
    updateNewStory({ ...newStory, title, pitch });
    navigation.navigate('CreateChannelScreen');
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'rgb(40,40,40)' }}>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" || Platform.isPad ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <Ionicons
              style={{ marginLeft: -10, width: 15 }}
              name='ios-arrow-back' size={24} color='white'
              onPress={() => navigation.pop()}
            />
            <View>
              <Text style={styles.header}>Preliminary</Text>
              <Text style={styles.describe}>Start your story with an introduction</Text>
            </View>

            <View style={styles.form}>
              <View style={styles.field}>
                <Text style={styles.label}>Title:</Text>
                <TextInput
                  underlineColorAndroid='rgba(0,0,0,0)'
                  style={styles.input}
                  autoFocus
                  maxLength={50}
                  autoCorrect
                  value={title}
                  onChangeText={text => setTitle(text)}
                />
                <Text style={styles.count}>{title.length}/50</Text>
              </View>

              <View style={styles.field}>
                <Text style={styles.label}>Pitch:</Text>
                <TextInput
                  underlineColorAndroid='rgba(0,0,0,0)'
                  style={styles.input}
                  multiline
                  numberOfLines={3}
                  maxLength={280}
                  autoCorrect
                  value={pitch}
                  onChangeText={text => setPitch(text)}
                />
                <Text style={styles.count}>{pitch.length}/280</Text>
              </View>

              <TouchableOpacity
                style={styles.submit}
                onPress={validateForNext}
              >
                <Text style={styles.submitText}>Next</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView >
  );
};