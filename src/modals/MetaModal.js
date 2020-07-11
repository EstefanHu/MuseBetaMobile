import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  ScrollView
} from 'react-native';
import {
  AntDesign,
  FontAwesome,
  Ionicons
} from '@expo/vector-icons';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  section: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 5,
  },
  actionLabel: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 15,
    color: 'rgb(70, 70, 70)',
  },
});

export const MetaModal = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.pop()}>
          <AntDesign
            style={{ marginHorizontal: 10 }}
            name='close'
            size={20}
            color='black'
          />
        </TouchableOpacity>
        <Text style={{ fontSize: 20 }}>Account</Text>
      </View>
      <ScrollView>
        <View style={styles.section}>

        </View>

        <View style={styles.section}>
          <TouchableOpacity
            style={styles.action}
            onPress={() => navigation.navigate('ProfileTopTabs')}
          >
            <FontAwesome name='user' size={20} color='rgb(80, 80, 80)' />
            <Text style={styles.actionLabel}>Your profile</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <TouchableOpacity
            style={styles.action}
            onPress={() => null}
          >
            <Ionicons name='md-settings' size={20} color='rgb(80, 80, 80)' />
            <Text style={styles.actionLabel}>Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.action}
            onPress={() => null}
          >
            <FontAwesome name='question-circle' size={20} color='rgb(80, 80, 80)' />
            <Text style={styles.actionLabel}>Help & Feedback</Text>
          </TouchableOpacity>
        </View>

        <View style={styles}></View>
      </ScrollView>
    </SafeAreaView>
  );
};