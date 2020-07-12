import React, { useContext } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {
  FontAwesome,
  Feather,
  Fontisto,
  MaterialIcons,
  MaterialCommunityIcons,
  Ionicons
} from '@expo/vector-icons';
import { getProfileImage } from './../../constants/network.js';
import DefaultImage from './../../../assets/user-default.png';
import Animated, { reanimated } from 'react-native-reanimated';

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
  const { state: { name, email, photo } } = useContext(ProfileContext);

  const bs = React.createRef();
  const fall = new Animated.Value(1);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
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
          </View>

          <TouchableOpacity style={styles.action}>
            <View>
              <Text>Name</Text>
              <Text>{name}</Text>
            </View>
            <MaterialIcons name='edit' size={20} color='grey' />
          </TouchableOpacity>

          <TouchableOpacity style={styles.action}>
            <View>
              <Text>Email</Text>
              <Text>{email}</Text>
            </View>
            <MaterialIcons name='edit' size={20} color='grey' />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => null} style={styles.submit}>
            <Text style={styles.submitLabel}>Submit</Text>
          </TouchableOpacity>
        </Animated.View>
        <BottomSheet
          ref={bs}
          snapPoints={[330, 0]}
          initialSnap={1}
          callbackNode={fall}
          enabledBottomClamp={true}
          renderHeader={() => <Header />}
          renderContent={() => <Panel bs={bs} />}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const bsStyles = StyleSheet.create({
  header: {
    backgroundColor: 'white',
    shadowColor: '#333333',
    shadowOffset: { width: -1, height: -3 },
    shadowRadius: 2,
    shadowOpacity: 0.2,
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

const Panel = bs => (
  <View style={bsStyles.panel}>
    <View style={{ alignItems: 'center' }}>
      <Text style={bsStyles.panelTitle}>Upload Photo</Text>
      <Text style={bsStyles.panelSubtitle}>Choose Your Profile Picture</Text>
    </View>
    <TouchableOpacity style={bsStyles.panelButton}>
      <Text style={bsStyles.panelButtonTitle}>Take Photo</Text>
    </TouchableOpacity>
    <TouchableOpacity style={bsStyles.panelButton}>
      <Text style={bsStyles.panelButtonTitle}>Choose From Library</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={bsStyles.panelButton}
      onPress={() => bs.current.snapTo(1)}>
      <Text style={bsStyles.panelButtonTitle}>Cancel</Text>
    </TouchableOpacity>
  </View>
)