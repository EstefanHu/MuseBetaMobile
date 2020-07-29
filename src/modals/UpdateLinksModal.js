import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';

import { Context as ProfileContext } from './../providers/ProfileProvider';
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
  linkWrapper: {
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

export const UpdateLinksModal = () => {
  const { state: { links } } = React.useContext(ProfileContext);
  const [one, setOne] = React.useState(links[0]);
  const [two, setTwo] = React.useState(links[1]);
  const [three, setThree] = React.useState(links[3]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <SafeAreaView>
          <View style={styles.intro}>
            <Text style={styles.header}>Update Links</Text>
            <Text style={styles.description}>
              Links are public URL's that you can use to connect other users
              to your external sources. You are alotted three total links so
              choose wisely.
            </Text>
          </View>

          <View style={styles.linkWrapper}>
            <Text style={styles.label}>Link 1</Text>
            <TextInput
              style={styles.input}
              underlineColorAndroid='rgba(0,0,0,0)'
              placeholder='www.example.com'
              value={one}
              onChangeText={text => setOne(text)}
            />
          </View>

          <View style={styles.linkWrapper}>
            <Text style={styles.label}>Link 2</Text>
            <TextInput
              style={styles.input}
              underlineColorAndroid='rgba(0,0,0,0)'
              placeholder='www.example.com'
              value={three}
              onChangeText={text => setTwo(text)}
            />
          </View>

          <View style={styles.linkWrapper}>
            <Text style={styles.label}>Link 3</Text>
            <TextInput
              style={styles.input}
              underlineColorAndroid='rgba(0,0,0,0)'
              placeholder='www.example.com'
              value={two}
              onChangeText={text => setThree(text)}
            />
          </View>
        </SafeAreaView>

        <UpdateActions action={'test'} />
      </View>
    </TouchableWithoutFeedback>
  );
};