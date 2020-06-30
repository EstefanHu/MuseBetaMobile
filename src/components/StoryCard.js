import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    width: 350,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20
  }
});

export const StoryCard = ({navigation, item}) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>{item.title}</Text>
        <Text>{item.genre}</Text>
      </View>
      <Text>{item.pitch}</Text>
      <View style={styles.meta}>
        <Text>{item.authorName} - {item.createdAt}</Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity
          onPress={() => navigation.navigate('StoryDetailScreen', { _id: item._id })}
        >
          <View style={styles.read}>
            <Text>Read</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}