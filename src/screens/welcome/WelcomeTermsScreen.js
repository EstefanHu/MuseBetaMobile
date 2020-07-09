import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import { } from 'react-native-gesture-handler';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgb(255,50,50)',
  },
  next: {
    backgroundColor: 'white',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    width: 200,
    marginBottom: 50
  },
  nextText: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center'
  }
});

export const WelcomeTermsScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Terms and Conditions</Text>
      <TouchableOpacity onPress={() => navigation.navigate('WelcomeLocationScreen')}>
        <View style={styles.next}>
          <Text style={styles.nextText}>Agree</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}