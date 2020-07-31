import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { Octicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
  },
  text: {
    color: 'rgb(255,50,50)',
    fontSize: 20,
  },
  icon: {
    height: 40,
    width: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(100,100,100,0.1)'
  }
});

export const BSActions = ({ storyId }) => {
  const navigation = useNavigation();

  return (
    <>
      <TouchableOpacity
        style={styles.container}
        onPress={() => navigation.navigate('ReportStack', { storyId })}
      >
        <Text style={styles.text}>Report an Issue</Text>
        <View style={styles.icon}>
          <Octicons name='report' size={18} color='rgb(255,50,50)' />
        </View>
      </TouchableOpacity>
    </>
  );
};