import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import {
  Ionicons,
  FontAwesome
} from '@expo/vector-icons';

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    width: 350,
    paddingVertical: 15,
    borderRadius: 5,
    marginTop: 10,
  },
  header: {
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20
  },
  metaContainer: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  meta: {
    paddingHorizontal: 15,
    color: 'grey',
    fontSize: 13,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  button: {
    backgroundColor: 'rgb(245,245,245)',
    borderBottomWidth: 1,
    borderColor: 'lightgrey',
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export const StoryCard = ({ navigation, item }) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>{item.title}</Text>
        <Text>{item.genre}</Text>
      </View>
      <Text>{item.pitch}</Text>
      <View style={styles.metaContainer}>
        <TouchableOpacity>
          <Text style={styles.meta}>{item.authorName}</Text>
        </TouchableOpacity>
        <Text style={styles.meta}> - {item.createdAt}</Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity
          onPress={() => navigation.navigate('StoryDetailScreen', { _id: item._id })}
        >
          <View style={styles.button}>
            <Ionicons name='md-book' size={20} color='grey' />
            <Text> Read</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.button}>
            <FontAwesome name='bookmark-o' size={20} color='grey' />
            <Text> Save</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}