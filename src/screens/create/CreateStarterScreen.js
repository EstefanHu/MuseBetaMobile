import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'rgb(40,40,40)'
  },
  field: {
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  label: {
    fontSize: 12,
    color: 'grey'
  },
  input: {
    fontSize: 18,
    width: '100%',
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 1,
  }
});

export const CreateStarterScreen = ({ navigation }) => {
  const [title, setTitle] = useState();
  const [channel, setChannel] = useState();
  const [pitch, setPitch] = useState();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.field}>
        <Text style={styles.label}>Title:</Text>
        <TextInput
          style={styles.input}
          placeholder='Enter Title...'
          autoCorrect
          value={title}
          onChangeText={text => setTitle(text)}
        />
      </View>
    </SafeAreaView>
  );
};