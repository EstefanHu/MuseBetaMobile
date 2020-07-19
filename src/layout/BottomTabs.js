import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  FontAwesome5,
  MaterialCommunityIcons,
  Feather
} from '@expo/vector-icons';

import { Context as JourneyContext } from './../providers/JourneyProvider.js';
import { Context as LayoutContext } from './../providers/LayoutProvider.js';

import { TopStack } from '../stacks/TopStack.js';
import { ExploreStack } from './../stacks/ExploreStack.js';
import { LibraryStack } from './../stacks/LibraryStack.js';
import { NewsStack } from './../stacks/NewsStack.js';
import { JourneyStack } from '../stacks/JourneyStack.js';

import { useHeaderHeight } from '@react-navigation/stack';

const Tabs = createBottomTabNavigator();

export const BottomTabs = () => {
  const { state: { status } } = useContext(JourneyContext);
  const { setPrimaryHeaderHeight } = useContext(LayoutContext);

  const height = useHeaderHeight();
  React.useEffect(() => { setPrimaryHeaderHeight(height) }, [])

  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ _, color, size }) => {
          if (route.name === 'Top') {
            return <FontAwesome5 name='tasks' size={size} color={color} />;
          } else if (route.name === 'Explore') {
            return <FontAwesome5 name='compass' size={size} color={color} />;
          } else if (route.name === 'Journey') {
            if (status === 'docked') return <MaterialCommunityIcons name='navigation' size={size} color={color} />
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
        inactiveTintColor: 'grey',

      }}
      initialRouteName={'Journey'}
    >
      <Tabs.Screen name='Top' component={TopStack} />
      <Tabs.Screen name='Explore' component={ExploreStack} />
      <Tabs.Screen name='Journey' component={JourneyStack} />
      <Tabs.Screen name='News' component={NewsStack} />
      <Tabs.Screen name='Library' component={LibraryStack} />
    </Tabs.Navigator>
  );
};  