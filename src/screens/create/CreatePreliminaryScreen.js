import React, { useState, useContext } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native';

import { Context as StoryContext } from './../../providers/StoryProvider.js';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(40,40,40)',
  },
  inner: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'space-between',
    paddingBottom: 20
  },
  form: {
    flexGrow: 2,
    justifyContent: 'flex-end',
  },
  header: {
    color: 'white',
    fontSize: 50,
    fontWeight: 'bold',
    marginTop: 10,
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
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" || Platform.isPad ? "padding" : "height"}
      style={styles.container}
      keyboardVerticalOffset={70}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <View>
            <Text style={styles.header}>Preliminary</Text>
            <Text style={styles.describe}>Start your story with an introduction</Text>
          </View>

          <SafeAreaView style={styles.form}>
            <View style={styles.field}>
              <Text style={styles.label}>Title:</Text>
              <TextInput
                underlineColorAndroid='rgba(0,0,0,0)'
                style={styles.input}
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
          </SafeAreaView>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};