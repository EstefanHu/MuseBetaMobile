import React, { useState, useEffect, useContext } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Permissions,
  Linking
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  };
});

export const JourneyLaunchScreen = () => {
  const [status, setStatus] = useState(null);
  const [hasError, setHasError] = useState(null);

  useEffect(() => {
    const { status } = await Permissions.getAsync(Permissions.LOCATION);
    setStatus(status);

    if (status)
  }, []);

  const linkSettings = () => Linking.openURL('app-settings:');

  return (
    <View style={styles.container}>
      <Text>Jello</Text>
    </View>
  );
};