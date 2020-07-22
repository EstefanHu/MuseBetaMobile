import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import { Context as SearchContext } from './../providers/SearchProvider.js';

const styles = StyleSheet.create({
  listItem: {
    paddingVertical: 10,
    flexDirection: 'row',
    borderBottomColor: 'rgba(200,200,200,0.8)',
    borderBottomWidth: 1,
  },
  itemIcon: {
    width: 35,
    height: 35,
    borderRadius: 25,
    backgroundColor: 'rgba(255,50,50,0.8)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  itemInfo: {
    paddingHorizontal: 10
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  }
});

export const StoryPreview = ({ item, initialBS, storyBS }) => {
  const { setStory } = React.useContext(SearchContext);

  const openItem = () => {
    setStory(item._id);
    initialBS.current.snapTo(2);
    storyBS.current.snapTo(1);
  }

  return (
    <TouchableOpacity
      key={item._id}
      style={styles.listItem}
      onPress={openItem}
    >
      <View style={styles.itemIcon}>
        <FontAwesome name='book' size={18} color='rgba(255,255,255,0.9)' />
      </View>
      <View style={styles.itemInfo}>
        <Text style={styles.title}>
          {
            ((item.title).length > 40) ?
              (((item.title).substring(0, 40 - 3)) + '...') :
              item.title
          }
        </Text>
      </View>
    </TouchableOpacity>
  );
};