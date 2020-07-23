import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  FontAwesome5,
  MaterialCommunityIcons,
  Feather
} from '@expo/vector-icons';

import { Context as StoryContext } from './../providers/StoryProvider.js';
import { Context as LocationContext } from './../providers/LocationProvider.js';
import { Context as LayoutContext } from './../providers/LayoutProvider.js';

import { TopStack } from '../stacks/TopStack.js';
import { ExploreStack } from './../stacks/ExploreStack.js';
import { LibraryStack } from './../stacks/LibraryStack.js';
import { NewsStack } from './../stacks/NewsStack.js';
import { NearStack } from '../stacks/NearStack.js';

import { useHeaderHeight } from '@react-navigation/stack';

const Tabs = createBottomTabNavigator();

export const BottomTabs = () => {
  const { setHeaderHeight, setInsets } = React.useContext(LayoutContext);
  const { fetchNearStories } = React.useContext(StoryContext);
  const { state: { longitude, latitude }, getCoords } = React.useContext(LocationContext);

  const height = useHeaderHeight();
  React.useEffect(() => {
    setHeaderHeight(height);
    setInsets();
  }, []);

  React.useEffect(() => {
    longitude ?
      fetchNearStories(5, longitude, latitude, 'mi')
      : getCoords();
  }, [longitude, latitude]);

  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ _, color, size }) => {
          if (route.name === 'Top') {
            return <FontAwesome5 name='tasks' size={size} color={color} />;
          } else if (route.name === 'Near') {
            return <Feather name='navigation' size={size} color={color} />
          } else if (route.name === 'Explore') {
            return <FontAwesome5 name='compass' size={size} color={color} />;
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
        keyboardHidesTabBar: true,
      }}
      initialRouteName={'Explore'}
    >
      <Tabs.Screen name='Top' component={TopStack} />
      {/* <Tabs.Screen name='Near' component={NearStack} /> */}
      <Tabs.Screen name='Explore' component={ExploreStack} />
      {/* <Tabs.Screen name='News' component={NewsStack} /> */}
      <Tabs.Screen name='Library' component={LibraryStack} />
    </Tabs.Navigator>
  );
};  