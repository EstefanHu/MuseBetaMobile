import createDataContext from './createDataContext.js';
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
    console.log(bottom)
    const height = device - header - top - bottom - 2 * BSHeader - 10;
    disptach({
      type: 'set_bottom_sheet_height',
      payload: height,
    });
  } catch (error) {
    console.log(error);
  }
}

export const { Context, Provider } = createDataContext(
  layoutReducer,
  {
    setHeaderHeight,
    setInsets,
    setBottomSheetHeaderHeight,
    setBottomSheetHeight,
  },
  {
    deviceHeight: Dimensions.get('window').height,
    deviceWidth: Dimensions.get('window').width,
    headerHeight: null,
    topInset: null,
    bottomInset: null,
    bottomSheetHeaderHeight: 30,
    bottomSheetHeight: null,
  }
);