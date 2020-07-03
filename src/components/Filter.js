import React from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  StyleSheet
} from 'react-native';
import { CHANNELS } from './../constants/channels.js';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    paddingVertical: 10,
  },
  scroll: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 5,
  },
  button: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'lightgrey',
    marginHorizontal: 5,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  selectedButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'grey',
    marginHorizontal: 5,
    backgroundColor: 'rgb(230,230,230)',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  content: {
    fontSize: 14,
    color: 'black',
  }
});

export const Filter = ({ channel, setChannel }) => (
  <View style={styles.container}>
    <ScrollView
      horizontal={true}
      style={styles.scroll}
      showsHorizontalScrollIndicator={false}
    >
      <TouchableOpacity
        style={channel === 'All' ? styles.selectedButton : styles.button}
        onPress={() => setChannel('All')}
      >
        <Text style={styles.content}>All</Text>
      </TouchableOpacity>
      {CHANNELS.map(item => (
        <TouchableOpacity
          key={item.label}
          style={item.value === channel ? styles.selectedButton : styles.button}
          onPress={() => setChannel(item.value)}
        >
          <Text style={styles.content}>
            {item.value}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  </View >
);