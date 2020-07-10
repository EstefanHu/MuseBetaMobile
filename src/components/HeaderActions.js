import React, { useContext } from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  MaterialCommunityIcons
} from '@expo/vector-icons';
import { getProfileImage } from './../constants/network.js';

import { Context as ProfileContext } from './../providers/ProfileProvider.js';

import DefaultImage from './../../assets/user-default.png';


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  icon: {
    marginRight: 10,
  },
  image: {
    height: 25,
    width: 25,
    borderColor: 'lightgrey',
    borderWidth: 1,
    borderRadius: 15,
  }
});

export const HeaderActions = ({ navigation }) => {
  const { state: { photo } } = useContext(ProfileContext);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate('CreateStoryModal')}>
        <MaterialCommunityIcons style={styles.icon} name='plus' size={22} color='grey' />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('ScanQRModal')}>
        <MaterialCommunityIcons style={styles.icon} name='qrcode-scan' size={22} color='grey' />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('MetaModal')}>
        <Image
          style={styles.image}
          source={
            photo ? getProfileImage + '/' + photo
              : DefaultImage
          }
        />
      </TouchableOpacity>
    </View>
  )
};