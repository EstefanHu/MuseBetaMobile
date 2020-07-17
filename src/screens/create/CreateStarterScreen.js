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

import { Context as StoryContext } from './../../providers/NewStoryProvider.js';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(40,40,40)'
  },
  inner: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'space-between',
  },
  header: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
    marginTop: 10,
  },
  choices: {

  }
});

export const CreateStarterScreen = ({ navigation }) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" || Platform.isPad ? "padding" : "height"}
      style={styles.container}
      keyboardVerticalOffset={70}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <Text style={styles.header}>Launch story.</Text>

          <SafeAreaView style={styles.choices}>

          </SafeAreaView>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};