import React, { useContext } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import {
  FontAwesome,
  Feather,
  Fontisto,
  MaterialCommunityIcons,
  Ionicons
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
  action: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
});

export const ProfileUpdateScreen = ({ navigation }) => {
  const { logout } = useContext(AuthContext);
  const { state: { name, photo } } = useContext(ProfileContext);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
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
            <FontAwesome name='user-o' size={20} />
            <TextInput
              placeholder='First Name'
              placeholderTextColor='#666666'
              autoCorrect={false}
              style={styles.textInput}
            />
          </View>
          <View style={styles.action}>
            <FontAwesome name='user-o' size={20} />
            <TextInput
              placeholder='Last Name'
              placeholderTextColor='#666666'
              autoCorrect={false}
              style={styles.textInput}
            />
          </View>
          <View style={styles.action}>
            <FontAwesome name='envelope-o' size={20} />
            <TextInput
              placeholder='Email Address'
              keyboardType='email-address'
              placeholderTextColor='#666666'
              autoCorrect={false}
              style={styles.textInput}
            />
          </View>
          <View style={styles.action}>
            <Feather name='phone' size={20} />
            <TextInput
              placeholder='Phone'
              placeholderTextColor='#666666'
              keyboardType='number-pad'
              autoCorrect={false}
              style={styles.textInput}
            />
          </View>
          <View style={styles.action}>
            <Ionicons name='md-globe' size={20} />
            <TextInput
              placeholder='Country'
              placeholderTextColor='#666666'
              autoCorrect={false}
              style={styles.textInput}
            />
          </View>
          <View style={styles.action}>
            <MaterialCommunityIcons name='city-variant-outline' size={20} />
            <TextInput
              placeholder='City'
              placeholderTextColor='#666666'
              autoCorrect={false}
              style={styles.textInput}
            />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}