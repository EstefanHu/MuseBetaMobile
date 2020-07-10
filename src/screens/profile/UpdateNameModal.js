import React, { useState, useEffect, useContext } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  SafeAreaView
} from 'react-native';

import { Context as ProfileContext } from '../../providers/ProfileProvider.js';

const styles = StyleSheet.create({
  container: {

  },
  inputContainer: {

  },
  inputLabel: {

  },
  input: {

  }
});

export const UpdateNameModal = ({ navigation }) => {
  const { state: { name } } = useContext(ProfileContext);
  const [firstName, setFirstName] = useState();
  const [middleName, setMiddleName] = useState();
  const [lastName, setLastName] = useState();

  useEffect(() => {
    const seperatedName = name.split(' ');
    setFirstName(seperatedName[0]);
    setLastName(seperatedName[-1]);

    if (seperatedName.length > 2)
      setMiddleName(seperatedName[2]);
  }), [name];

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>First Name</Text>
        <TextInput
          style={styles.input}
          autoFocus
          value={firstName}
          autoCapitalize='none'
          autoCorrect={false}
          onChangeText={text => setFirstName(text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Middle Name</Text>
        <TextInput
          style={styles.input}
          value={middleName}
          autoCapitalize='none'
          autoCorrect={false}
          onChangeText={text => setMiddleName(text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Last Name</Text>
        <TextInput
          style={styles.input}
          value={lastName}
          autoCapitalize='none'
          autoCorrect={false}
          onChangeText={text => setLastName(text)}
        />
      </View>
      <Text>3 name changes allowed every 90 days.</Text>
    </View>
  )
}