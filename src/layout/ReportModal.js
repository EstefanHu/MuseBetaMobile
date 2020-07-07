import React, { useState, useContext } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import { Context as StoryContext } from './../providers/StoryProvider.js';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center'
  },
  title: {
    fontSize: 25,
    marginTop: 20,
  },
  input: {
    width: 300,
    backgroundColor: '#ebebeb',
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 13,
    fontSize: 18,
    marginVertical: 10,
  },
  report: {
    backgroundColor: 'red',
    paddingHorizontal: 30,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },
  reportLabel: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 25
  }
});

export const ReportModal = ({ route, navigation }) => {
  const { state: { stories } } = useContext(StoryContext);
  // const { storyId } = route.params;

  // const story = stories.find(s => s.title === '1984');
  const [report, setReport] = useState('');

  const onSubmit = () => {
    console.log(report);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <Text style={styles.title}>Report The Great Gatsby</Text>
        <TextInput
          style={styles.input}
          underlineColorAndroid='rgba(0,0,0,0)'
          placeholder='Report...'
          autoCorrect
          multiline
          numberOfLines={4}
          value={report}
          onChangeText={text => setReport(text)}
        />
        <TouchableOpacity onPress={onSubmit}>
          <View style={styles.report}>
            <Text style={styles.reportLabel}>Report</Text>
          </View>
        </TouchableOpacity>
      </View >
    </TouchableWithoutFeedback >
  );
};