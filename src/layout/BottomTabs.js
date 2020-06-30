import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  FontAwesome5,
  MaterialCommunityIcons,
} from '@expo/vector-icons';

import { Context as StoryContext } from '../providers/StoryProvider.js';
import { Context as ConnectionContext } from '../providers/ConnectionProvider.js';

import { StoryStack } from '../stacks/StoryStack.js';
import { ConnectionStack } from '../stacks/ConnectionStack.js';
import { ConversationStack } from '../stacks/ConversationStack.js';

const Tabs = createBottomTabNavigator();

export const BottomTabs = () => {

  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ _, color, size }) => {
          if (route.name === 'Story') {
            return <FontAwesome5 name={'tasks'} size={size} color={color} />;
          } else if (route.name === 'Connection') {
            return <MaterialCommunityIcons name={'account-group'} size={size} color={color} />
          } else if (route.name === 'Conversation') {
            return <MaterialCommunityIcons name={'message-text'} size={size} color={color} />
          }
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}
    >
      <Tabs.Screen name='Story' component={StoryStack} listeners={{ focus: () => console.log('focused') }} />
      <Tabs.Screen name='Connection' component={ConnectionStack} listeners={{ focus: () => null }} />
      <Tabs.Screen name='Conversation' component={ConversationStack} />
    </Tabs.Navigator>
  );
};