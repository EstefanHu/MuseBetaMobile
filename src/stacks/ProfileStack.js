import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { StoryListScreen } from '../screens/StoryListScreen.js';
import { StoryDetailScreen } from '../screens/StoryDetailScreen.js';
import { StoryEngageScreen } from '../screens/StoryEngageScreen.js';

const Stack = createStackNavigator();

export const StoryStack = () => (
  <Stack.Navigator>
    <Stack.Screen name='StoryListScreen' component={StoryListScreen} />
    <Stack.Screen name='StoryDetailScreen' component={StoryDetailScreen} />
    <Stack.Screen name='StoryEngageScreen' component={StoryEngageScreen} />
  </Stack.Navigator>
)