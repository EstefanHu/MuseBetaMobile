import React, { useContext } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  TextInput,
} from 'react-native';
import {
  FontAwesome,
  Feather,
  Fontisto
} from '@expo/vector-icons';
import { getProfileImage } from './../../constants/network.js';
import DefaultImage from './../../../assets/user-default.png';

import { Context as AuthContext } from './../../providers/AuthProvider.js';
import { Context as ProfileContext } from './../../providers/ProfileProvider.js';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  image: {
    height: 100,
    width: 100,
    borderColor: 'lightgrey',
    borderWidth: 1,
    borderRadius: 15,
  },
  cameraHolder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  camera: {
    opacity: 0.7,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 10,
  },
  userName: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold'
  },
});

export const ProfileUpdateScreen = ({ navigation }) => {
  const { logout } = useContext(AuthContext);
  const { state: { name, photo } } = useContext(ProfileContext);

  return (
    <View style={styles.container}>
      <View style={{ margin: 20 }}>
        <View style={{ alignItems: 'center' }}>
          <TouchableOpacity onPress={() => null}>
            <ImageBackground
              style={styles.image}
              source={
                photo ? getProfileImage + '/' + photo
                  : DefaultImage
              }
              source={DefaultImage}
            >
              <View style={styles.cameraHolder}>
                <Fontisto style={styles.camera} name='camera' size={35} color='#fff' />
              </View>
            </ImageBackground>
          </TouchableOpacity>
          <Text style={styles.userName}>{name}</Text>
        </View>

        <View style={styles.action}>
          <TextInput
            placeholder='First Name'
            placeholderTextColor='#666666'
            style={styles.textInput}
          />

        </View>
      </View>
    </View>
  )
}