import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
});

export const JourneyDeploymentScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Deployment</Text>
    </View>
  );
};