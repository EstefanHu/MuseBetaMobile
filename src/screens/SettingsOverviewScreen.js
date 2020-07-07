import React, { useState, useEffect, useContext } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView
} from 'react-native';
import { Context as ProfileContext } from '../providers/ProfileProvider.js';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollView: {
  },
  userName: {
    fontSize: 28
  },
  header: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
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
  name: {
    fontSize: 22,
    fontWeight: 'bold'
  },
});

import ProfileImage from './../../assets/user-default.png';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export const SettingsOverviewScreen = ({ navigation }) => {
  const { state: { name, email } } = useContext(ProfileContext);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <View style={styles.profile}>
            <Image
              style={styles.profileImage}
              source={ProfileImage}
            />
            <View style={styles.info}>
              <Text style={styles.name}>{name}</Text>
            </View>
          </View>

          <TouchableOpacity
            onPress={() => navigation.navigate('updateProfile')}>
            <MaterialCommunityIcons name='settings' size={25} color='grey' />
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  )
}