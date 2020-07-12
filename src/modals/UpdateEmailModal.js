import React, { useState, useContext } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput
} from 'react-native';

import { Context as ProfileContext } from '../providers/ProfileProvider.js';

const styles = StyleSheet.create({
  container: {

  }
});

export const UpdateEmailModal = () => {
  const { state: { email } } = useContext(ProfileContext);
  const [newEmail, setNewEmail] = useState(email);

  return (
    <View style={styles.container}>
      <Text>Email Address</Text>
      <TextInput
        style={styles.input}
        autoFocus
        value={newEmail}
        onChangeText={text => setNewEmail(text)}
      />
    </View>
  )
}