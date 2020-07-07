import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import { SettingsOverviewScreen } from './../screens/SettingsOverviewScreen.js';

import {
  MaterialCommunityIcons
} from '@expo/vector-icons';
import { BackHeader } from '../components/BackHeader.js';


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  icon: {
    // marginRight: 10,
  }
});

const SettingsActions = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate('SettingsModal')}>
        <MaterialCommunityIcons
          style={styles.icon}
          name='dots-vertical'
          size={22}
          color='grey'
        />
      </TouchableOpacity>
    </View>
  )
}

const Stack = createStackNavigator();

export const SettingsStack = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='SettingsOverviewScreen'
        component={SettingsOverviewScreen}
        options={({ navigation }) => ({
          animationEnabled: true,
          headerLeft: () => <BackHeader navigation={navigation} />,
          headerTitle: null,
          headerRight: () => <SettingsActions navigation={navigation} />
        })}
      />
    </Stack.Navigator>
  )
}