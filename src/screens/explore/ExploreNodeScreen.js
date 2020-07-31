import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import { Context as JourneyContext } from './../../providers/JourneyProvider.js';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: 'white',
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginTop: 15,
    borderRadius: 5,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  doneButton: {
    marginTop: 40,
    backgroundColor: 'rgb(220,220,220)',
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  doneText: {
    fontWeight: 'bold',
    fontSize: 22,
  }
});

export const ExploreNodeScreen = ({ navigation }) => {
  const { state: { title, body, step } } = React.useContext(JourneyContext);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.stepNumber}>Step {step}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.body}>{body}</Text>
      </View>

      <TouchableOpacity
        style={styles.doneButton}
        onPress={() => navigation.pop()}
      >
        <Text style={styles.doneText}>Done</Text>
      </TouchableOpacity>
    </View>
  );
};