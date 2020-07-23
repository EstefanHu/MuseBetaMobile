import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { ReportLaunchScreen } from '../screens/report/ReportLaunchScreen';
import { ReportConfirmScreen } from '../screens/report/ReportConfirmScreen';
import { ReportStatusScreen } from '../screens/report/ReportStatusScreen';

const Stack = createStackNavigator();

export const ReportStack = () => {

  return (
    <Stack.Navigator>
      <Stack.Screen
        name='ReportLaunchScreen'
        component={ReportLaunchScreen}
        mode={'screen'}
      />
      <Stack.Screen
        name='ReportConfirmScreen'
        component={ReportConfirmScreen}
      />
      <Stack.Screen
        name='ReportStatusScreen'
        component={ReportStatusScreen}
      />
    </Stack.Navigator>
  );
};