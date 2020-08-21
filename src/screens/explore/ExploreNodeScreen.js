import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import { Context as JourneyContext } from './../../providers/JourneyProvider.js';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 15
  },
  card: {
    backgroundColor: 'white',
    paddingVertical: 15,
    paddingHorizontal: 15,
    marginBottom: 20,
    borderRadius: 5,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  body: {
    fontSize: 18,
  },
  doneButton: {
    backgroundColor: 'rgb(255,50,50)',
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 30,
  },
  doneText: {
    fontWeight: 'bold',
    fontSize: 22,
    color: 'white',
  }
});

export const ExploreNodeScreen = ({ navigation }) => {
  const { state: { title, body, step } } = React.useContext(JourneyContext);

  return (
    <ScrollView
      style={styles.container}
      bounces={false}
    >
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
    </ScrollView>
  );
};