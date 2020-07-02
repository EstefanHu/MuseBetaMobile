import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { StoryListScreen } from './../screens/StoryListScreen.js';
import { StoryDetailScreen } from './../screens/StoryDetailScreen.js';
import { StoryEngageScreen } from './../screens/StoryEngageScreen.js';
import { StoryCreateScreen } from './../screens/StoryCreateScreen.js';

import { Logo } from './../components/Logo.js';
import { HeaderActions } from '../components/HeaderActions.js';

const Stack = createStackNavigator();

export const StoryStack = () => (
  <Stack.Navigator screenOptions={{}}>
    <Stack.Screen
      name='StoryListScreen'
      component={StoryListScreen}
      options={({ navigation }) => ({
        headerLeft: () => <Logo />,
        headerTitle: null,
        headerRight: () => <HeaderActions navigation={navigation} />
      })}
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
    <Stack.Screen
      name='StoryCreateScreen'
      component={StoryCreateScreen}
    />
  </Stack.Navigator>
)