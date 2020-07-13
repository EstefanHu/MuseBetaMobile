import React, { useContext } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Dimensions
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { getProfileImage } from './../../constants/network.js';

import { Context as ProfileContext } from './../../providers/ProfileProvider.js';


import DefaultImage from './../../../assets/user-default.png';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  userName: {
    fontSize: 28
  },
  header: {
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    width: Dimensions.get('window').width,
  },
  profile: {
    flexDirection: 'row'
  },
  profileImage: {
    height: 80,
    width: 80,
    borderColor: 'lightgrey',
    borderWidth: 1,
    borderRadius: 40,
  },
  info: {
    marginLeft: 15,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold'
  },
  credibility: {
    fontSize: 19
  },
});

export const ProfileOverviewScreen = ({ navigation }) => {
  const { state: { name, credibility, photo } } = useContext(ProfileContext);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.profile}>
          <Image
            style={styles.profileImage}
            source={
              photo ? { uri: getProfileImage + '/' + photo }
                : DefaultImage
            }
          />
          <View style={styles.info}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.credibility}>{credibility}</Text>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate('ProfileUpdateScreen')}>
          <MaterialCommunityIcons name='settings' size={25} color='grey' />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};