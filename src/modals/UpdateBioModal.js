import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard
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

export const UpdateNameModal = ({ navigation }) => {
  const { state: { name } } = React.useContext(ProfileContext);
  const [firstName, setFirstName] = React.useState();
  const [middleName, setMiddleName] = React.useState();
  const [lastName, setLastName] = React.useState();

  React.useEffect(() => {
    const seperatedName = name.split(' ');
    setFirstName(seperatedName[0]);
    setLastName(seperatedName[seperatedName.length - 1]);

    if (seperatedName.length > 2)
      setMiddleName(seperatedName[1]);
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <SafeAreaView>
          <View style={styles.intro}>
            <Text style={styles.header}>Change Name</Text>
            <Text style={styles.description}>
              Name can be change up to three times every 90 days.
            </Text>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>First Name</Text>
            <TextInput
              style={styles.input}
              underlineColorAndroid='rgba(0,0,0,0)'
              value={firstName}
              autoCapitalize='none'
              autoCorrect={false}
              onChangeText={text => setFirstName(text)}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Middle Name</Text>
            <TextInput
              style={styles.input}
              underlineColorAndroid='rgba(0,0,0,0)'
              value={middleName}
              autoCapitalize='none'
              autoCorrect={false}
              onChangeText={text => setMiddleName(text)}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Last Name</Text>
            <TextInput
              style={styles.input}
              underlineColorAndroid='rgba(0,0,0,0)'
              value={lastName}
              autoCapitalize='none'
              autoCorrect={false}
              onChangeText={text => setLastName(text)}
            />
          </View>
        </SafeAreaView>

        <UpdateActions
          body={{ name: `${firstName} ${middleName} ${lastName}` }}
          navigation={navigation}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};