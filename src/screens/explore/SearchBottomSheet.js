import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import {
  Ionicons
} from '@expo/vector-icons';

import { Context as SearchContext } from './../../providers/SearchProvider.js';
import { Context as LayoutContext } from './../../providers/LayoutProvider.js';

import BottomSheet from 'reanimated-bottom-sheet';

export const SearchBottomSheet = () => {
  const { state: { catagory, query, results }, cancelQuery, clearCatagory } = React.useContext(SearchContext);
  const { state: {
    deviceHeight,
    bottomSheetHeaderHeight,
    headerHeight,
    topInset,
    bottomInset,
    initialBottomSheetRef,
    searchBottomSheetRef
  } } = React.useContext(LayoutContext);

  const deactivate = () => {
    initialBottomSheetRef.current.snapTo(1);
    searchBottomSheetRef.current.snapTo(2);
    clearCatagory();
  }

  const NONSCREEN = headerHeight + topInset + bottomInset + bottomSheetHeaderHeight;

  return bottomInset ?
    <BottomSheet
      ref={searchBottomSheetRef}
      snapPoints={[
        deviceHeight - NONSCREEN,
        deviceHeight / 2 - NONSCREEN,
        catagory ? bottomInset + bottomSheetHeaderHeight : 0
      ]}
      initialSnap={2}
      enabledContentTapInteraction={false}
      enabledBottomInitialAnimation={true}
      enabledBottomClamp={true}
      onCloseStart={() => initialBottomSheetRef.current.snapTo(2)}
      onOpenEnd={() => initialBottomSheetRef.current.snapTo(2)}
      renderHeader={
        () =>
          <BottomSheetHeader
            deactivate={deactivate}
            catagory={catagory}
            results={results}
          />
      }
      renderContent={
        () =>
          <BottomSheetBody />
      }
    /> : null
};

const headerStyles = StyleSheet.create({
  header: {
    backgroundColor: 'rgba(255,255,255,0.8)',
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
    fontSize: 18,
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
    backgroundColor: 'rgba(255,255,255,0.8)',
    paddingTop: 10,
    height: '100%'
  }
});

const BottomSheetBody = () => {

  return (
    <View style={bodyStyles.container}>

    </View>
  );
};