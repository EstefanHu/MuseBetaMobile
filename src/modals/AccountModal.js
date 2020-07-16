import React, { useContext } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  ScrollView,
  Image
} from 'react-native';
import {
  AntDesign,
  FontAwesome,
  Ionicons
} from '@expo/vector-icons';
import { getProfileImage } from '../constants/network.js';

import { Context as ProfileContext } from '../providers/ProfileProvider.js';

import DefaultImage from './../../assets/user-default.png';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  profile: {
    flexDirection: 'row',
    padding: 15
  },
  image: {
    height: 50,
    width: 50,
    borderColor: 'lightgrey',
    borderWidth: 1,
    borderRadius: 50,
  },
  section: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#f2f2f2',
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 5,
  },
  actionLabel: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 15,
    color: 'rgb(70, 70, 70)',
  },
});

export const AccountModal = ({ navigation }) => {
  const { state: { name, email, photo } } = useContext(ProfileContext);

  const popThenNavigateTo = async route => {
    await navigation.pop();
    setTimeout(() => {
      navigation.navigate(route);
    }, 500);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.pop()}>
          <AntDesign
            style={{ marginHorizontal: 10 }}
            name='close'
            size={20}
            color='black'
          />
        </TouchableOpacity>
        <Text style={{ fontSize: 20 }}>Account</Text>
      </View>
      <ScrollView>
        <View style={styles.profile}>
          <Image
            style={styles.image}
            source={
              photo ? { uri: getProfileImage + '/' + photo }
                : DefaultImage
            }
          />
          <View style={{ paddingLeft: 12 }}>
            <Text style={{ fontSize: 18 }}>{name}</Text>
            <Text>{email}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <TouchableOpacity
            style={styles.action}
            onPress={() => popThenNavigateTo('ProfileTopTabs')}
          >
            <FontAwesome name='user' size={20} color='rgb(80, 80, 80)' />
            <Text style={styles.actionLabel}>Your profile</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <TouchableOpacity
            style={styles.action}
            onPress={() => popThenNavigateTo('SettingsStack')}
          >
            <Ionicons name='md-settings' size={20} color='rgb(80, 80, 80)' />
            <Text style={styles.actionLabel}>Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.action}
            onPress={() => popThenNavigateTo('SupportStack')}
          >
            <FontAwesome name='question-circle' size={20} color='rgb(80, 80, 80)' />
            <Text style={styles.actionLabel}>Help & Feedback</Text>
          </TouchableOpacity>
        </View>

        <View style={styles}></View>
      </ScrollView>
    </SafeAreaView>
  );
};