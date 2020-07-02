import React, { useEffect, useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  FontAwesome5,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import decode from 'jwt-decode';

import { Context as AuthContext } from './../providers/AuthProvider.js';

import { StoryStack } from './../stacks/StoryStack.js';
import { ExploreStack } from './../stacks/ExploreStack.js';
import { LibraryStack } from './../stacks/LibraryStack.js';
import { ProfileStack } from './../stacks/ProfileStack.js';

const Tabs = createBottomTabNavigator();

export const BottomTabs = () => {
  const { state: { token }, logout } = useContext(AuthContext);

  useEffect(() => {
    try {
      const expDate = decode(token);
      if (expDate.exp < new Date().getTime() / 1000)
        logout();
    } catch (error) {
      logout();
    }
  }, [])

  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ _, color, size }) => {
          if (route.name === 'Story') {
            return <FontAwesome5 name='tasks' size={size} color={color} />;
          } else if (route.name === 'Explore') {
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
      <Tabs.Screen name='Explore' component={ExploreStack} listeners={{ focus: () => null }} />
      <Tabs.Screen name='Library' component={LibraryStack} listeners={{ focus: () => null }} />
      <Tabs.Screen name='Profile' component={ProfileStack} listeners={{ focus: () => null }} />
    </Tabs.Navigator>
  );
};