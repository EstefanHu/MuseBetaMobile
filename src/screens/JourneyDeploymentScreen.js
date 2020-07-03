import React, { useContext } from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import { Context as JourneyContext } from './../providers/JourneyProvider.js';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
});

export const JourneyDeploymentScreen = () => {
  const { state: { status } } = useContext(JourneyContext);

  return (
    <View style={styles.container}>
      {
        status === 'inactive' ?
          <Idle /> : <View><Text>{status}</Text></View>
      }
    </View>
  );
};

const Idle = () => {
  return (
    <View>
      <Text>Inactive</Text>
    </View>
  )
};