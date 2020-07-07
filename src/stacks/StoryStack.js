import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { StoryListScreen } from '../screens/story/StoryListScreen.js';
import { StoryDetailScreen } from '../screens/story/StoryDetailScreen.js';
import { StoryEngageScreen } from '../screens/story/StoryEngageScreen.js';

const Stack = createStackNavigator();

export const StoryStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name='StoryListScreen'
      component={StoryListScreen}
      initialParams={{ channel: 'All' }}
    />
    <Stack.Screen
      name='StoryDetailScreen'
      component={StoryDetailScreen}
    />
    <Stack.Screen
      name='StoryEngageScreen'
      component={StoryEngageScreen}
    />
  </Stack.Navigator>
)