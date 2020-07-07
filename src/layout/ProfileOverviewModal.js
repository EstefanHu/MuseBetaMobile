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
import {
  MaterialCommunityIcons
} from '@expo/vector-icons';
import { Context as ProfileContext } from './../providers/ProfileProvider.js';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
  },
  userName: {
    fontSize: 28
  },
  header: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center'
  }
});

export const ProfileOverviewModal = ({ navigation }) => {
  const { state: { name } } = useContext(ProfileContext);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <TouchableOpacity onPress={() => navigation.pop()}>
              <MaterialCommunityIcons name='close' size={30} color='black' />
            </TouchableOpacity>
            <Text style={styles.userName}>{name}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}