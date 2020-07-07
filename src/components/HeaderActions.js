import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  MaterialCommunityIcons
} from '@expo/vector-icons';

import ProfileImage from './../../assets/user-default.png';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  icon: {
    marginRight: 10,
  },
  profileImage: {
    height: 25,
    width: 25,
    borderColor: 'lightgrey',
    borderWidth: 1,
    borderRadius: 15,
  }
});

export const HeaderActions = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate('CreateStoryModal')}>
        <MaterialCommunityIcons style={styles.icon} name='plus' size={22} color='grey' />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('ProfileOverviewModal')}>
        <Image
          style={styles.profileImage}
          source={ProfileImage}
        />
      </TouchableOpacity>
    </View>
  )
};