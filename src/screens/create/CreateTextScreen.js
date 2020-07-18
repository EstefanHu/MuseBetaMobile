import React, { useState, useContext } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Context as StoryContext } from './../../providers/StoryProvider.js';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'space-between',
    marginBottom: 10
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
    minHeight: 50,
    maxHeight: 200,
  },
  count: {
    color: 'rgb(220,220,220)',
    fontSize: 10,
    textAlign: 'right'
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

export const CreateTextScreen = ({ navigation }) => {
  const { state: { newStory }, updateNewStory } = useContext(StoryContext);
  const [body, setBody] = useState('');

  const validateForNext = () => {
    updateNewStory({ ...newStory, body });
    navigation.navigate('CreateLocationScreen');
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'rgb(40,40,40)' }}>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" || Platform.isPad ? "padding" : "height"}
        style={{ flex: 1 }}
      // keyboardVerticalOffset={20}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <View>
              <Ionicons
                style={{ marginLeft: -10, width: 15 }}
                name='ios-arrow-back' size={24} color='white'
                onPress={() => navigation.pop()}
              />
              <Text style={styles.header}>Text</Text>
              <Text style={styles.describe}>Add text body.</Text>
            </View>

            <View>
              <View style={styles.field}>
                <Text style={styles.label}>Body:</Text>
                <TextInput
                  underlineColorAndroid='rgba(0,0,0,0)'
                  style={styles.input}
                  autoFocus
                  multiline
                  numberOfLines={3}
                  maxLength={50000}
                  autoCorrect
                  value={body}
                  onChangeText={text => setBody(text)}
                />
                <Text style={styles.count}>{body.length}/50,000</Text>
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
    </SafeAreaView>
  );
};