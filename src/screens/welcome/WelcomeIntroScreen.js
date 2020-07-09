import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgb(255,50,50)',
  },
  heroContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  hero: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 30
  },
  logo: {
    marginTop: -40,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 200,
  },
  tease: {
    marginBottom: 5,
    fontSize: 16,
    color: 'white'
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

export const WelcomeIntroScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.heroContainer}>
        <Text style={styles.hero}>Welcome</Text>
        <Text style={styles.logo}>:M</Text>
      </View>
      <View>
        <Text>Project:Muse</Text>
      </View>
      <View>
        <Text style={styles.tease}>begin your story?</Text>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('WelcomeLocationScreen')}>
        <View style={styles.next}>
          <Text style={styles.nextText}>Start</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};