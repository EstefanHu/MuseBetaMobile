import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ScrollView
} from 'react-native';
import { } from 'react-native-gesture-handler';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgb(255,50,50)',
  },
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hero: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10
  },
  content: {
    backgroundColor: 'white',
    height: Dimensions.get('window').height * 0.6,
    width: Dimensions.get('window').width * 0.75,
    borderRadius: 5,
    overflow: 'hidden'
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
      <View style={styles.main}>
        <Text style={styles.hero}>Terms and Conditions</Text>
        <View style={styles.content}>
    <ScrollView>
      
    </ScrollView>
        </View>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('WelcomeLocationScreen')}>
        <View style={styles.next}>
          <Text style={styles.nextText}>Agree</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}