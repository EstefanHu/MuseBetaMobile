import React from 'react';
import {
  View,
  TouchableOpacity
} from 'react-native';
import Animated from 'react-native-reanimated';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { ProfileOverviewScreen } from '../screens/profile/ProfileOverviewScreen.js';
import { ProfileUpdateScreen } from '../screens/profile/ProfileUpdateScreen.js';
import { ProfileBioScreen } from '../screens/profile/ProfileBioScreen.js';
import { ProfileStoryScreen } from '../screens/profile/ProfileStoryScreen.js';

const Tab = createMaterialTopTabNavigator();

export const ProfileTopTabs = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        labelStyle: { fontSize: 10, marginTop: -2 },
        tabStyle: {},
        style: { height: 40 },
        indicatorStyle: { backgroundColor: 'rgb(255,50,50)' }
      }}
    >
      <Tab.Screen
        name='ProfileOverviewScreen'
        component={ProfileOverviewScreen}
        options={{
          title: 'Overview'
        }}
      />
      <Tab.Screen
        name='ProfileStoryScreen'
        component={ProfileStoryScreen}
        options={{
          title: 'Stories'
        }}
      />
      <Tab.Screen
        name='ProfileUpdateScreen'
        component={ProfileUpdateScreen}
        options={{
          title: 'Update'
        }}
      />
      <Tab.Screen
        name='ProfileBioScreen'
        component={ProfileBioScreen}
        options={{
          title: 'Bio'
        }}
      />
    </Tab.Navigator>
  );
};

const TabBar = ({ state, descriptors, navigation, position }) => (
  <View style={{ flexDirection: 'row' }}>
    {state.routes.map((route, index) => {
      const { options } = descriptors[route.key];
      const label =
        options.tabBarLabel !== undefined
          ? options.tabBarLabel
          : options.title !== undefined
            ? options.title
            : route.name;

      const isFocused = state.index === index;

      const onPress = () => {
        const event = navigation.emit({
          type: 'tabPress',
          target: route.key,
          canPreventDefault: true,
        });

        if (!isFocused && !event.defaultPrevented) {
          navigation.navigate(route.name);
        }
      };

      const onLongPress = () => {
        navigation.emit({
          type: 'tabLongPress',
          target: route.key,
        });
      };

      const inputRange = state.routes.map((_, i) => i);
      const opacity = Animated.interpolate(position, {
        inputRange,
        outputRange: inputRange.map(i => (i === index ? 1 : 0)),
      });

      return (
        <TouchableOpacity
          accessibilityRole="button"
          accessibilityStates={isFocused ? ['selected'] : []}
          accessibilityLabel={options.tabBarAccessibilityLabel}
          testID={options.tabBarTestID}
          onPress={onPress}
          onLongPress={onLongPress}
          style={{ flex: 1 }}
        >
          <Animated.Text style={{ opacity }}>
            {label}
          </Animated.Text>
        </TouchableOpacity>
      );
    })}
  </View>
);