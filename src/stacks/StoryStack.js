import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text
} from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import { StoryListScreen } from './../screens/StoryListScreen.js';
import { StoryDetailScreen } from './../screens/StoryDetailScreen.js';
import { StoryEngageScreen } from './../screens/StoryEngageScreen.js';
import { StoryCreateScreen } from './../screens/StoryCreateScreen.js';

import { Logo } from './../components/Logo.js';

const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
    borderColor: 'lightgrey',
    backgroundColor: 'rgb(245,245,245)',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 3,
    marginRight: 15,
  }
});

const Stack = createStackNavigator();

export const StoryStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name='StoryListScreen'
      component={StoryListScreen}
      options={({ navigation }) => ({
        headerLeft: () => <Logo />,
        headerTitle: 'Story',
        headerRight: () => (
          <TouchableOpacity
            onPress={() => navigation.navigate('StoryCreateScreen')}
          >
            <View style={styles.button}>
              <Text>+</Text>
            </View>
          </TouchableOpacity>
        )
      })}
      initialParams={{ genre: 'All' }}
    />
    <Stack.Screen
      name='StoryDetailScreen'
      component={StoryDetailScreen}
    />
    <Stack.Screen
      name='StoryEngageScreen'
      component={StoryEngageScreen}
    />
    <Stack.Screen
      name='StoryCreateScreen'
      component={StoryCreateScreen}
    />
  </Stack.Navigator>
)