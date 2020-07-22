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
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

import { Context as LayoutContext } from './../../providers/LayoutProvider.js';

import BottomSheet from 'reanimated-bottom-sheet';

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'rgba(255,255,255,0.8)',
    shadowColor: '#333333',
    shadowOffset: { width: -1, height: -3 },
    shadowRadius: 2,
    shadowOpacity: 0.2,
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
    justifyContent: 'space-between'
  },
});

const PANNEL_HEADER_HEIGHT = 30;

export const SearchBottomSheet = ({ searchBS }) => {
  const { state: { headerHeight, topInset, bottomInset } } = React.useContext(LayoutContext);

  const activeSnapPoints = [
    Dimensions.get('window').height - headerHeight
    - topInset - bottomInset - PANNEL_HEADER_HEIGHT,
    Dimensions.get('window').height / 2 - headerHeight
    - topInset - bottomInset - PANNEL_HEADER_HEIGHT,
    bottomInset + PANNEL_HEADER_HEIGHT
  ];

  const deactivate = () => {
    console.log('deactivate');
  }

  return (
    <BottomSheet
      ref={searchBS}
      snapPoints={activeSnapPoints}
      initialSnap={2}
      enabledBottomInitialAnimation={false}
      enabledBottomClamp={true}
      renderHeader={
        () =>
          <BottomSheetHeader
            searchBS={searchBS}
            deactivate={deactivate}
          />
      }
      renderContent={
        () =>
          <BottomSheetBody
            searchBS={searchBS}
          />
      }
    />
  );
};

const BottomSheetHeader = ({ type, deactivate }) => {

  return (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle}></View>
      </View>

      <View style={styles.headerInfo}>
        <View>
          <Text>{type}</Text>
          <Text></Text>
        </View>

        <TouchableOpacity
          style={styles.back}
          onPress={deactivate}
        >
          <MaterialIcons name='cancel' size={22} color='grey' />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const BottomSheetBody = () => {

  return (
    <View>

    </View>
  );
};