import React from 'react';
import {
  TouchableOpacity
} from 'react-native';
import {
  MaterialCommunityIcons
} from '@expo/vector-icons';

export const BackHeader = ({ navigation }) => {
  return (
    <TouchableOpacity onPress={() => navigation.pop()}>
      <MaterialCommunityIcons name='close' size={30} color='black' />
    </TouchableOpacity>
  )
};