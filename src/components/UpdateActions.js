import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingVertical: 20,
  },
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  actionButton: {},
  actionText: {
    fontSize: 19,
    color: 'blue'
  }
});

export const UpdateActions = ({ action }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={styles.wrapper}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.pop()}
          >
            <Text style={styles.actionText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
          >
            <Text style={styles.actionText}>Update</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};