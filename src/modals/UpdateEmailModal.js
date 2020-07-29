import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';

import { Context as ProfileContext } from '../providers/ProfileProvider.js';
import { UpdateActions } from './../components/UpdateActions.js';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  intro: {
    marginVertical: 10,
    marginHorizontal: 20
  },
  header: {
    fontWeight: 'bold',
    fontSize: 40,
    color: 'rgb(255,50,50)',
    textAlign: 'center',
  },
  description: {
    fontSize: 18,
  },
  inputContainer: {
    marginTop: 10,
    marginBottom: 10,
    paddingBottom: 5,
    paddingHorizontal: 20,
  },
  label: {
    color: 'grey'
  },
  input: {
    backgroundColor: 'lightgrey',
    height: 42,
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 20
  }
});

export const UpdateEmailModal = ({ navigation }) => {
  const { state: { email } } = React.useContext(ProfileContext);
  const [newEmail, setNewEmail] = React.useState(email);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <SafeAreaView>
          <View style={styles.intro}>
            <Text style={styles.header}>Update Email</Text>
            <Text style={styles.description}>
              This email is public, so be mindful of what you choose.
            </Text>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email Address</Text>
            <TextInput
              style={styles.input}
              underlineColorAndroid='rgba(0,0,0,0)'
              placeholder={'me@example.com'}
              value={newEmail}
              autoCapitalize='none'
              autoCorrect={false}
              onChangeText={text => setNewEmail(text)}
            />
          </View>

        </SafeAreaView>

        <UpdateActions body={{ email: newEmail }} navigation={navigation} />
      </View>
    </TouchableWithoutFeedback>
  )
}