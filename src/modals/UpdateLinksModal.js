import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  SafeAreaView
} from 'react-native';


import { UpdateActions } from './../components/UpdateActions.js';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: 'red'
  }
});

export const UpdateLinksModal = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View>
        <Text>Hello</Text>
      </View>

      <UpdateActions action={'test'} />
    </View>
  );
};