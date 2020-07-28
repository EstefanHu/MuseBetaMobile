import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';

import { Context as LayoutContext } from './../providers/LayoutProvider.js';

import BottomSheet from 'reanimated-bottom-sheet';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

export const NavigationBottomSheet = () => {
  const { state: {
    deviceHeight,
    bottomSheetHeaderHeight,
    headerHeight,
    topInset,
    bottomInset,
    initialBottomSheetRef,
    storyBottomSheetRef,
  } } = React.useContext(LayoutContext);

  return bottomInset ?
    <BottomSheet

    /> : null
}

