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

import { Context as LayoutContext } from './../providers/LayoutProvider.js';
import { Context as SearchContext } from './../providers/SearchProvider.js';

export const BSSearch = () => {
  const { state: { history, query, results },
    getHistory, clearHistory, setCatagory } = React.useContext(SearchContext);
  const { state: { initialBottomSheetRef, searchBottomSheetRef } } = React.useContext(LayoutContext);

  React.useEffect(() => { (async () => { getHistory() })() }, []);

  const openSubject = subject => {
    setCatagory(subject);
    initialBottomSheetRef.current.snapTo(2);
    searchBottomSheetRef.current.snapTo(1);
  }

  return query ?
    <SearchingView
      query={query}
      results={results}
    />
    : <CatagoryView
      history={history}
      clearHistory={clearHistory}
      openSubject={openSubject}
    />
};

const searchingStyles = StyleSheet.create({
  container: {

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
  }
})

const SearchingView = ({ query, results }) => (
  <View style={searchingStyles.container}>
    {
      results.map(item => (
        <TouchableOpacity
          style={searchingStyles.item}
          onPress={() => console.log(item)}
        >
          <View style={searchingStyles.icon}>

          </View>
          <Text style={searchingStyles.label}>{item}</Text>
        </TouchableOpacity>
      ))
    }
  </View>
);

const catagoryStyles = StyleSheet.create({
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

const CatagoryView = ({ history, clearHistory, openSubject }) => (
  <ScrollView
    keyboardShouldPersistTaps='handled'
    keyboardDismissMode='on-drag'
    bounces={false}
  >
    {
      history.length > 0 ? <View style={catagoryStyles.section}>
        <View style={catagoryStyles.sectionHeader}>
          <Text style={catagoryStyles.sectionLabel}>Recent Searches</Text>
          <TouchableOpacity onPress={clearHistory}>
            <Text style={catagoryStyles.more}>Clear</Text>
          </TouchableOpacity>
        </View>
        {
          history.map((item, idx) => (
            <TouchableOpacity
              key={idx}
              style={catagoryStyles.item}
              onPress={() => console.log('search: ', item)}
            >
              <FontAwesome style={{ marginHorizontal: 10 }} name='search' size={22} color='grey' />
              <Text style={catagoryStyles.searchItem}>{item}</Text>
            </TouchableOpacity>
          ))
        }
      </View> : null
    }
    <View style={catagoryStyles.section}>
      <View style={catagoryStyles.sectionHeader}>
        <Text style={catagoryStyles.sectionLabel}>Search Nearby</Text>
      </View>

      <TouchableOpacity
        style={catagoryStyles.item}
        onPress={() => openSubject('Story')}
      >
        <View style={[catagoryStyles.icon, { backgroundColor: 'rgba(255,50,50,0.8)' }]}>
          <FontAwesome name='book' size={18} color='rgba(255,255,255,0.9)' />
        </View>
        <Text style={catagoryStyles.label}>Story</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={catagoryStyles.item}
        onPress={() => openSubject('Journey')}
      >
        <View style={[catagoryStyles.icon, { backgroundColor: 'rgba(255,50,50,0.8)' }]}>
          <MaterialCommunityIcons name='map-marker-path' size={18} color='rgba(255,255,255,0.9)' />
        </View>
        <Text style={catagoryStyles.label}>Journey</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={catagoryStyles.item}
        onPress={() => openSubject('Campfire')}
      >
        <View style={[catagoryStyles.icon, { backgroundColor: 'rgba(230,180,0,0.8)' }]}>
          <MaterialCommunityIcons name='campfire' size={18} color='rgba(255,255,255,0.9)' />
        </View>
        <Text style={catagoryStyles.label}>Campfire</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={catagoryStyles.item}
        onPress={() => openSubject('Monument')}>
        <View style={[catagoryStyles.icon, { backgroundColor: 'rgba(50,50,255,0.8)' }]}>
          <FontAwesome5 name='monument' size={18} color='rgba(255,255,255,0.9)' />
        </View>
        <Text style={catagoryStyles.label}>Monument</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={catagoryStyles.item}
        onPress={() => openSubject('Chapter')}>
        <View style={[catagoryStyles.icon, { backgroundColor: 'rgba(0,220,180,0.8)' }]}>
          <MaterialCommunityIcons name='lighthouse' size={18} color='rgba(255,255,255,0.9)' />
        </View>
        <Text style={catagoryStyles.label}>Chapter</Text>
      </TouchableOpacity>
    </View>
  </ScrollView >
);