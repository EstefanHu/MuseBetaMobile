import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Picker
} from 'react-native';
import { CHANNELS } from './../../constants/channels.js';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(40,40,40)'
  },
  inner: {
    flex: 1,
    padding: 24,
    justifyContent: 'space-between',
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
    marginBottom: 15,
    paddingBottom: 5,
  },
  label: {
    fontSize: 12,
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
    height: 40
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

export const CreateStarterScreen = ({ navigation }) => {
  const [channel, setChannel] = useState();

  const validateForNext = () => {
    console.log('yup');
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
              <Text style={styles.label}>Channel:</Text>
              <Picker
                style={styles.input}
                onValueChange={(itemValue, itemIndex) => setChannel(itemValue)}
              >
                {CHANNELS.map(c => (
                  <Picker.Item
                    label={c.label}
                    value={c.value}
                  />
                ))}
              </Picker>
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