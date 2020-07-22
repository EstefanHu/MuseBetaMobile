import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {
  FontAwesome,
  FontAwesome5,
  MaterialCommunityIcons
} from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';

const styles = StyleSheet.create({
  container: {
  },
  section: {
    marginBottom: 30,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(200,200,200,0.5)',
    paddingBottom: 5,
  },
  sectionLabel: {
    color: 'grey',
    fontSize: 13
  },
  item: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(200,200,200,0.5)',
    alignItems: 'center',
  },
  icon: {
    height: 40,
    width: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  label: {
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  more: {
    color: 'rgba(0, 100, 255, 0.7)',
    fontSize: 13
  },
  searchItem: {
    fontSize: 18,
    marginLeft: 10,
  }
});



export const BSSearch = ({ initialBS, searchBS }) => {
  const [history, setHistory] = React.useState([]);

  React.useEffect(() => {
    (async () => {
      const storedHistory = await AsyncStorage.getItem('SearchHistory');
      if (storedHistory && storedHistory.length > 0)
        setHistory(storedHistory);
    })();
  });

  const clearHistory = async () => {
    await AsyncStorage.removeItem('SearchHistory');
    setHistory([]);
  }

  const openSubject = subject => {
    initialBS.current.snapTo(2);
    searchBS.current.snapTo(1);
  }

  return (
    <ScrollView
      style={styles.container}
      keyboardDismissMode='on-drag'
    >
      {
        history.length > 0 ? <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionLabel}>Recent Searches</Text>
            <TouchableOpacity onPress={clearHistory}>
              <Text style={styles.more}>Clear</Text>
            </TouchableOpacity>
          </View>
          {
            history.map((item, idx) => (
              <TouchableOpacity
                key={idx}
                style={styles.item}
                onPress={() => console.log('search: ', item)}
              >
                <FontAwesome style={{ marginHorizontal: 10 }} name='search' size={22} color='grey' />
                <Text style={styles.searchItem}>{item}</Text>
              </TouchableOpacity>
            ))
          }
        </View> : null
      }
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionLabel}>Search Nearby</Text>
        </View>

        <TouchableOpacity
          style={styles.item}
          onPress={() => openSubject('story')}
        >
          <View style={[styles.icon, { backgroundColor: 'rgba(255,50,50,0.8)' }]}>
            <FontAwesome name='book' size={18} color='rgba(255,255,255,0.9)' />
          </View>
          <Text style={styles.label}>Story</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.item}
          onPress={() => openSubject('journey')}
        >
          <View style={[styles.icon, { backgroundColor: 'rgba(255,50,50,0.8)' }]}>
            <MaterialCommunityIcons name='map-marker-path' size={18} color='rgba(255,255,255,0.9)' />
          </View>
          <Text style={styles.label}>Journey</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.item}
          onPress={() => openSubject('campfire')}
        >
          <View style={[styles.icon, { backgroundColor: 'rgba(230,180,0,0.8)' }]}>
            <MaterialCommunityIcons name='campfire' size={18} color='rgba(255,255,255,0.9)' />
          </View>
          <Text style={styles.label}>Campfire</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.item}
          onPress={() => openSubject('monument')}>
          <View style={[styles.icon, { backgroundColor: 'rgba(50,50,255,0.8)' }]}>
            <FontAwesome5 name='monument' size={18} color='rgba(255,255,255,0.9)' />
          </View>
          <Text style={styles.label}>Monument</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.item}
          onPress={() => openSubject('chapter')}>
          <View style={[styles.icon, { backgroundColor: 'rgba(0,220,180,0.8)' }]}>
            <MaterialCommunityIcons name='lighthouse' size={18} color='rgba(255,255,255,0.9)' />
          </View>
          <Text style={styles.label}>Chapter</Text>
        </TouchableOpacity>
      </View>
    </ScrollView >
  );
};