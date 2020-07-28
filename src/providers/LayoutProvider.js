import createDataContext from './createDataContext.js';
import React from 'react';
import { NO_BEZEL } from './../constants/ios.js';
import * as Device from 'expo-device';
import { Dimensions } from 'react-native';

const layoutReducer = (state, action) => {
  switch (action.type) {
    case 'set_header_height':
      return { ...state, headerHeight: action.payload };
    case 'set_inset':
      return {
        ...state,
        topInset: action.payload.topInset,
        bottomInset: action.payload.bottomInset,
      };
    case 'set_bottom_sheet_header_height':
      return { ...state, bottomSheetHeaderHeight: action.payload };
    case 'set_bottom_sheet_height':
      return { ...state, bottomSheetHeight: action.payload };
    case 'set_map_ref':
      return { ...state, mapRef: action.payload };
    case 'set_input_ref':
      return { ...state, inputRef: action.payload };
    case 'set_initial_bottom_sheet_ref':
      return { ...state, initialBottomSheetRef: action.payload };
    case 'set_search_bottom_sheet_ref':
      return { ...state, searchBottomSheetRef: action.payload };
    case 'set_story_bottom_sheet_ref':
      return { ...state, storyBottomSheetRef: action.payload };
    default:
      return state;
  }
};

const setHeaderHeight = dispatch => height =>
  dispatch({ type: 'set_header_height', payload: height });

const setInsets = dispatch => () => {
  try {
    dispatch({
      type: 'set_inset',
      payload: {
        topInset: NO_BEZEL.includes(Device.modelId) ? 24 : 0,
        bottomInset: NO_BEZEL.includes(Device.modelId) ? 34 : 30
      }
    })
  } catch (error) {
    console.log(error);
  }
}

const setBottomSheetHeaderHeight = dispatch => height =>
  dispatch({ type: 'set_bottom_sheet_header_height', payload: height });

const setBottomSheetHeight = disptach => (device, header, top, bottom, BSHeader) => {
  try {
    const height = device - header - top - bottom - 3 * BSHeader;
    disptach({
      type: 'set_bottom_sheet_height',
      payload: height,
    });
  } catch (error) {
    console.log(error);
  }
}

const setMapRef = dispatch => ref =>
  dispatch({ type: 'set_map_ref', payload: ref });

const setInputRef = dispatch => ref =>
  dispatch({ type: 'set_input_ref', payload: ref });

const setInitialBottomSheetRef = dispatch => ref =>
  dispatch({ type: 'set_initial_bottom_sheet_ref', payload: ref });

const setSearchBottomSheetRef = dispatch => ref =>
  dispatch({ type: 'set_search_bottom_sheet_ref', payload: ref });

const setStoryBottomSheetRef = dispatch => ref =>
  dispatch({ type: 'set_story_bottom_sheet_ref', payload: ref });

export const { Context, Provider } = createDataContext(
  layoutReducer,
  {
    setHeaderHeight,
    setInsets,
    setBottomSheetHeaderHeight,
    setBottomSheetHeight,
    setMapRef,
    setInputRef,
    setInitialBottomSheetRef,
    setSearchBottomSheetRef,
    setStoryBottomSheetRef,
  },
  {
    deviceHeight: Dimensions.get('window').height,
    deviceWidth: Dimensions.get('window').width,
    headerHeight: null,
    topInset: null,
    bottomInset: null,
    bottomSheetHeaderHeight: 30,
    bottomSheetHeight: null,
    mapRef: null,
    inputRef: null,
    initialBottomSheetRef: null,
    searchBottomSheetRef: null,
    storyBottomSheetRef: null
  }
);