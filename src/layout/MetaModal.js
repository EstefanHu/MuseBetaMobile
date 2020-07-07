import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: Dimensions.get('window').width,
  },
  cancel: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: 30,
  }
});

export const MetaModal = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Hello World</Text>
      <TouchableOpacity onPress={() => navigation.pop()}>
        <View style={styles.cancel}>
          <Text style={styles.cancelLabel}>Cancel</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};