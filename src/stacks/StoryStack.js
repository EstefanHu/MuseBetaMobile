import React from 'react';
import {
  Button
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { StoryListScreen } from './../screens/StoryListScreen.js';
import { StoryDetailScreen } from './../screens/StoryDetailScreen.js';
import { StoryEngageScreen } from './../screens/StoryEngageScreen.js';
import { StoryCreateScreen } from './../screens/StoryCreateScreen.js';

const Stack = createStackNavigator();

export const StoryStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name='StoryListScreen'
      component={StoryListScreen}
      options={({ navigation }) => ({
        headerLeft: () => null,
        headerTitle: 'Story',
        headerRight: () => (
          <Button
            onPress={() => navigation.navigate('StoryCreateScreen')}
            title="+"
          />
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