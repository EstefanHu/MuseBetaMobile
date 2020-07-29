import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import { Context as SearchContext } from './../providers/SearchProvider.js';
import { Context as LayoutContext } from './../providers/LayoutProvider.js';

const styles = StyleSheet.create({
  listItem: {
    paddingVertical: 10,
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

export const StoryPreview = ({ item }) => {
  const { setStory } = React.useContext(SearchContext);
  const { state: { mapRef, initialBottomSheetRef, storyBottomSheetRef } } = React.useContext(LayoutContext);

  const openItem = () => {
    setStory(item._id);
    initialBottomSheetRef.current.snapTo(2);
    storyBottomSheetRef.current.snapTo(1);

    mapRef.current.animateToRegion(
      {
        longitude: item.startLocation.coordinates[0],
        latitude: item.startLocation.coordinates[1] - 0.009,
        longitudeDelta: 0.05,
        latitudeDelta: 0.05
      },
      1000
    );
  }

  return (
    <View style={styles.listItem}>
      <TouchableOpacity
        style={{ flexDirection: 'row' }}
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
    </View>
  );
};