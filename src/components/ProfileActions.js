import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity
} from 'react-native';

import {
  MaterialCommunityIcons
} from '@expo/vector-icons';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  icon: {
    // marginRight: 10,
  }
});

export const ProfileActions = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate('MetaModal')}>
        <MaterialCommunityIcons
          style={styles.icon}
          name='dots-vertical'
          size={22}
          color='grey'
        />
      </TouchableOpacity>
    </View>
  );
};