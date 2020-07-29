import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  TouchableWithoutFeedback,
  Alert
} from 'react-native';
import {
  Fontisto,
  MaterialIcons,
} from '@expo/vector-icons';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import { getProfileImage } from './../../constants/network.js';
import DefaultImage from './../../../assets/user-default.png';
import Animated from 'react-native-reanimated';

import { Context as ProfileContext } from './../../providers/ProfileProvider.js';

import BottomSheet from 'reanimated-bottom-sheet';

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
    overflow: 'hidden'
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
  action: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  label: {
    fontSize: 12,
    color: 'grey'
  },
  infoLabel: {
    fontSize: 18
  },
  links: {
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  addLink: {
    backgroundColor: 'rgb(220,220,220)',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
  },
  addLinkText: {
    fontWeight: 'bold',
    textAlign: 'center'
  },
  submit: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: 'rgb(255,50,50)',
    alignItems: 'center',
    marginTop: 10,
  },
  submitLabel: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
});

export const ProfileUpdateScreen = ({ navigation }) => {
  const { state: { name, email, photo, links, bio } } = React.useContext(ProfileContext);

  const bs = React.createRef();
  const fall = new Animated.Value(1);

  return (
    <View style={styles.container}>
      <Animated.View style={{
        margin: 20,
        opacity: Animated.add(0.1, Animated.multiply(fall, 1.0)),
      }}>
        <View style={{ alignItems: 'center' }}>
          <TouchableOpacity onPress={() => bs.current.snapTo(0)}>
            <ImageBackground
              style={styles.image}
              source={
                photo ? { uri: getProfileImage + '/' + photo }
                  : DefaultImage
              }
            >
              <View style={styles.cameraHolder}>
                <Fontisto style={styles.camera}
                  name='camera' size={35} color='#fff' />
              </View>
            </ImageBackground>
          </TouchableOpacity>
        </View>

        <View style={styles.action}>
          <View>
            <Text style={styles.label}>Name</Text>
            <Text style={styles.infoLabel}>{name}</Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('UpdateNameModal')}>
            <MaterialIcons name='edit' size={20} color='grey' />
          </TouchableOpacity>
        </View>

        <View style={styles.action}>
          <View>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.infoLabel}>{email}</Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('UpdateEmailModal')}>
            <MaterialIcons name='edit' size={20} color='grey' />
          </TouchableOpacity>
        </View >

        <View style={styles.action}>
          <View>
            <Text style={styles.label}>Links</Text>
            {
              links.map(l => (
                <View style={styles.link}>
                  <Text style={styles.infoLabel}>{l}</Text>
                  <MaterialIcons name='edit' size={20} color='grey' />
                </View>
              ))
            }
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('UpdateLinksModal')}>
            <MaterialIcons name='edit' size={20} color='grey' />
          </TouchableOpacity>
        </View>

        <View style={styles.action}>
          <View>
            <Text style={styles.label}>Bio</Text>
            <Text style={styles.infoLabel}>{bio}</Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('UpdateBioModal')}>
            <MaterialIcons name='edit' size={20} color='grey' />
          </TouchableOpacity>
        </View>
      </Animated.View >
      <BottomSheet
        ref={bs}
        snapPoints={[330, 0]}
        initialSnap={1}
        callbackNode={fall}
        enabledBottomClamp={true}
        enabledContentTapInteraction={false}
        renderHeader={() => <Header />}
        renderContent={() => <Panel bs={bs} />}
      />
    </View >
  );
};

const bsStyles = StyleSheet.create({
  header: {
    backgroundColor: 'white',
    shadowColor: '#333333',
    shadowOffset: { width: -1, height: -3 },
    shadowRadius: 2,
    shadowOpacity: 0.1,
    paddingTop: 20,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  panel: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: 'rgb(255,50,50)',
    alignItems: 'center',
    marginVertical: 7,
    zIndex: 10
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  }
})

const Header = () => (
  <View style={bsStyles.header}>
    <View style={bsStyles.panelHeader}>
      <View style={bsStyles.panelHandle}></View>
    </View>
  </View>
);

const Panel = ({ bs }) => {
  const { uploadProfilePhoto } = React.useContext(ProfileContext);

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
    if (!cancelled) {
      uploadProfilePhoto(uri);
      bs.current.snapTo(1);
    }
  }

  const takePhoto = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    if (status !== 'granted') return Alert.alert(
      'Grant Permission',
      'Previously blocked access to CAMERA. Do you want to change settings?',
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
    const { cancelled, uri } = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
    });

    if (!cancelled) {
      uploadProfilePhoto(uri);
      bs.current.snapTo(1);
    };
  };


  return (
    <View style={bsStyles.panel}>
      <View style={{ alignItems: 'center' }}>
        <Text style={bsStyles.panelTitle}>Upload Photo</Text>
        <Text style={bsStyles.panelSubtitle}>Choose Your Profile Picture</Text>
      </View>

      <TouchableOpacity
        style={bsStyles.panelButton}
        onPress={selectPicture}>
        <Text style={bsStyles.panelButtonTitle}>Choose From Library</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={bsStyles.panelButton}
        onPress={takePhoto}>
        <Text style={bsStyles.panelButtonTitle}>Take Photo</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={bsStyles.panelButton}
        onPress={() => bs.current.snapTo(1)}>
        <Text style={bsStyles.panelButtonTitle}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
};