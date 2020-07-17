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
import * as Permissions from 'expo-permissions';
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

  const navigateToCreate = async () => {
    const { status, canAskAgain } = await Permissions.getAsync(
      Permissions.AUDIO_RECORDING,
      Permissions.CAMERA,
      Permissions.CAMERA_ROLL,
    );

    switch (status) {
      case 'undetermined':
        return navigation.navigate(
          'CreatePermissionsModal', { status: 'undetermined' });
      case 'denied':
        if (canAskAgain) {
          const { status } = await Permissions.askAsync(
            Permissions.AUDIO_RECORDING,
            Permissions.CAMERA,
            Permissions.CAMERA_ROLL,
          );

          if (status === 'granted')
            return navigation.navigate('CreateLauncherModal');
        }
        return navigation.navigate('CreatePermissionsModal', { status: 'denied' });
      default:
        return navigation.navigate('CreateLauncherModal');
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={navigateToCreate}>
        <MaterialCommunityIcons style={styles.icon} name='plus' size={22} color='grey' />
      </TouchableOpacity>
      {/* <TouchableOpacity onPress={() => navigation.navigate('ScanQRModal')}>
        <MaterialCommunityIcons style={styles.icon} name='qrcode-scan' size={22} color='grey' />
      </TouchableOpacity> */}
      <TouchableOpacity
        onPress={() => navigation.navigate('AccountModal')}>
        <Image
          style={styles.image}
          source={
            photo ? { uri: getProfileImage + '/' + photo }
              : DefaultImage
          }
        />
      </TouchableOpacity>
    </View>
  );
};