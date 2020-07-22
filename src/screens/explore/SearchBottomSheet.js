import React from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native';
import {
  MaterialIcons,
  Ionicons
} from '@expo/vector-icons';

import { Context as SearchContext } from './../../providers/SearchProvider.js';
import { Context as LayoutContext } from './../../providers/LayoutProvider.js';

import BottomSheet from 'reanimated-bottom-sheet';

const PANNEL_HEADER_HEIGHT = 30;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export const SearchBottomSheet = ({ initialBS, searchBS }) => {
  const { state: { catagory, query, results }, cancelQuery, clearCatagory } = React.useContext(SearchContext);
  const { state: { headerHeight, topInset, bottomInset } } = React.useContext(LayoutContext);

  const deactivate = () => {
    initialBS.current.snapTo(1);
    searchBS.current.snapTo(2);
    clearCatagory();
  }

  return bottomInset ?
    <BottomSheet
      ref={searchBS}
      snapPoints={[
        SCREEN_HEIGHT - headerHeight
        - topInset - bottomInset - PANNEL_HEADER_HEIGHT,
        SCREEN_HEIGHT / 2 - headerHeight
        - topInset - bottomInset - PANNEL_HEADER_HEIGHT,
        catagory ? bottomInset + PANNEL_HEADER_HEIGHT : 0
      ]}
      initialSnap={2}
      enabledBottomInitialAnimation={true}
      enabledBottomClamp={true}
      onCloseStart={() => initialBS.current.snapTo(2)}
      onOpenEnd={() => initialBS.current.snapTo(2)}
      renderHeader={
        () =>
          <BottomSheetHeader
            searchBS={searchBS}
            deactivate={deactivate}
            catagory={catagory}
            results={results}
          />
      }
      renderContent={
        () =>
          <BottomSheetBody
            searchBS={searchBS}
          />
      }
    /> : null
};

const headerStyles = StyleSheet.create({
  header: {
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: 'rgba(200,200,200,0.4)',
    borderLeftWidth: 1,
    borderLeftColor: 'rgba(200,200,200,0.4)',
    borderRightWidth: 1,
    borderRightColor: 'rgba(200,200,200,0.4)',
    paddingVertical: 5,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    paddingHorizontal: 20,
    alignItems: 'center'
  },
  panelHandle: {
    width: 40,
    height: 6,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 6,
  },
  headerInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  back: {
    backgroundColor: 'lightgrey',
    width: 25,
    height: 25,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

const BottomSheetHeader = ({ catagory, results, deactivate }) => (
  <View style={headerStyles.header}>
    <View style={headerStyles.panelHeader}>
      <View style={headerStyles.panelHandle}></View>
    </View>

    <View style={headerStyles.headerInfo}>
      <View>
        <Text style={headerStyles.title}>{catagory}</Text>
        <Text style={headerStyles.results}>{results.length} found</Text>
      </View>

      <TouchableOpacity
        style={headerStyles.back}
        onPress={deactivate}
      >
        <Ionicons name='ios-close' size={25} color='white' />
      </TouchableOpacity>
    </View>
  </View>
);

const bodyStyles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    backgroundColor: 'white',
    paddingTop: 10,
    height: '100%'
  }
});

const BottomSheetBody = ({ searchBS }) => {

  return (
    <View style={bodyStyles.container}>

    </View>
  );
};