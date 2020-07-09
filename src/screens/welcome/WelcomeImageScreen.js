import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Alert,
  Linking,
  Image,
} from 'react-native';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';

import ProfileImage from './../../../assets/user-default.png';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgb(255,50,50)',
  },
  imageSelector: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 180,
    height: 180,
    borderRadius: 90,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: 'lightgrey',
  },
  button: {
    backgroundColor: 'white',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    width: 200,
    marginBottom: 10,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center'
  },
  skip: {
    marginBottom: 50,
    color: 'white',
    fontSize: 16
  }
});

export const WelcomeImageScreen = ({ navigation }) => {
  const [photoUri, setPhotoUri] = useState(null);

  const selectPicture = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status !== 'granted') return Alert.alert(
      'Grant Permission',
      'Previously blocked access to CAMERA_ROLL. Do you want to change settings?',
      [
        {
          text: 'Skip',
          style: 'cancel',
        },
        {
          text: 'Settings',
          onPress: () => Linking.openSettings()
        }
      ],
      { cancelable: false }
    )

    const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync({
      aspect: 1,
      allowsEditing: true,
    });
    if (!cancelled) setPhotoUri(uri);
  }

  const takePhoto = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    if (status !== 'granted') return;

    const { cancelled, uri } = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
    });

    if (!cancelled) setPhotoUri(uri);
  }

  const submitPhoto = () => {
    navigation.navigate('WelcomePermissionScreen');
  }

  return (
    <View style={styles.container}>
      <View style={styles.imageSelector}>
        <Image
          style={styles.image}
          source={
            photoUri ? {
              uri: photoUri
            }
              : ProfileImage
          }
        />
        <TouchableOpacity onPress={selectPicture}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Upload Image</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={takePhoto}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Take Photo</Text>
          </View>
        </TouchableOpacity>
      </View>
      {
        photoUri &&
        <TouchableOpacity onPress={submitPhoto}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Upload</Text>
          </View>
        </TouchableOpacity>
      }
      <TouchableOpacity onPress={() => navigation.navigate('WelcomePermissionScreen')}>
        <Text style={styles.skip}>Skip for now</Text>
      </TouchableOpacity>
    </View>
  )
}