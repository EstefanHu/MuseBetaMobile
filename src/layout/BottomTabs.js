import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  FontAwesome5,
  MaterialCommunityIcons,
} from '@expo/vector-icons';

import { StoryStack } from './../stacks/StoryStack.js';
import { MapStack } from './../stacks/MapStack.js';
import { LibraryStack } from './../stacks/LibraryStack.js';
import { ProfileStack } from './../stacks/ProfileStack.js';

const Tabs = createBottomTabNavigator();

export const BottomTabs = () => {

  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ _, color, size }) => {
          if (route.name === 'Story') {
            return <FontAwesome5 name='tasks' size={size} color={color} />;
          } else if (route.name === 'Map') {
            return <FontAwesome5 name='map' size={size} color={color} />;
          } else if (route.name === 'Library') {
            return <MaterialCommunityIcons name='library-shelves' size={size} color={color} />;
          } else if (route.name === 'Profile') {
            return <MaterialCommunityIcons name='account-group' size={size} color={color} />;
          }
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}
    >
      <Tabs.Screen name='Story' component={StoryStack} listeners={{ focus: () => console.log('focused') }} />
      <Tabs.Screen name='Map' component={MapStack} listeners={{ focus: () => null }} />
      <Tabs.Screen name='Library' component={LibraryStack} listeners={{ focus: () => null }} />
      <Tabs.Screen name='Profile' component={ProfileStack} listeners={{ focus: () => null }} />
    </Tabs.Navigator>
  );
};