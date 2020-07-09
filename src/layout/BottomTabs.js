import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  FontAwesome5,
  MaterialCommunityIcons,
  Feather
} from '@expo/vector-icons';

import { TopStack } from '../stacks/TopStack.js';
import { ExploreStack } from './../stacks/ExploreStack.js';
import { LibraryStack } from './../stacks/LibraryStack.js';
import { NewsStack } from './../stacks/NewsStack.js';
import { JourneyStack } from '../stacks/JourneyStack.js';

const Tabs = createBottomTabNavigator();

export const BottomTabs = () => (
  <Tabs.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ _, color, size }) => {
        if (route.name === 'Top') {
          return <FontAwesome5 name='tasks' size={size} color={color} />;
        } else if (route.name === 'Explore') {
          return <FontAwesome5 name='compass' size={size} color={color} />;
        } else if (route.name === 'Journey') {
          if (false) return <MaterialCommunityIcons name='navigation' size={size} color={color} />
          return <Feather name='navigation' size={size} color={color} />
        } else if (route.name === 'News') {
          return <MaterialCommunityIcons name='email-outline' size={size} color={color} />
        } else if (route.name === 'Library') {
          return <MaterialCommunityIcons name='library-shelves' size={size} color={color} />;
        }
      },
    })}
    tabBarOptions={{
      activeTintColor: 'rgb(255,50,50)',
      inactiveTintColor: 'gray',
    }}
  >
    <Tabs.Screen name='Top' component={TopStack} />
    <Tabs.Screen name='Explore' component={ExploreStack} />
    <Tabs.Screen name='Journey' component={JourneyStack} />
    <Tabs.Screen name='News' component={NewsStack} />
    <Tabs.Screen name='Library' component={LibraryStack} />
  </Tabs.Navigator>
);