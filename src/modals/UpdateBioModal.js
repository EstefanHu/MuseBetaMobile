import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

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
  meta: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  label: {
    color: 'grey'
  },
  input: {
    backgroundColor: 'lightgrey',
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 20,
  }
});

export const UpdateBioModal = ({ navigation }) => {
  const { state: { bio } } = React.useContext(ProfileContext);
  const [edit, setEdit] = React.useState(bio || '');

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
        >
          <SafeAreaView>
            <View style={styles.intro}>
              <Text style={styles.header}>Update Bio</Text>
              <Text style={styles.description}>
                A quick, fun intro of who you are as a content creator.
            </Text>
            </View>

            <View style={styles.inputContainer}>
              <View style={styles.meta}>
                <Text style={styles.label}>Bio</Text>
                <Text>{edit.length}/500</Text>
              </View>
              <TextInput
                style={styles.input}
                underlineColorAndroid='rgba(0,0,0,0)'
                placeholder={'Its kinda lonely here... write something!'}
                value={edit}
                autoCorrect
                onChangeText={text => setEdit(text)}
                multiline
                maxLength={500}
                numberOfLines={4}
              />
            </View>
          </SafeAreaView>
        </KeyboardAvoidingView>

        <UpdateActions
          body={{ bio: edit }}
          navigation={navigation}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};