import createDataContext from './createDataContext.js';
import { NO_BEZEL } from './../constants/ios.js';
import * as Device from 'expo-device';

const layoutReducer = (state, action) => {
  switch (action.type) {
    case 'set_header_height':
      return { ...state, headerHeight: action.payload };
    case 'set_bottom_tab_height':
      return { ...state, bottomTabHeight: action.payload };
    default:
      return state;
  }
};

const setHeaderHeight = dispatch => height =>
  dispatch({ type: 'set_header_height', payload: height });

const setBottomTabHeight = dispatch => () => {
  try {
    const height = NO_BEZEL.includes(Device.modelId) ? 34 : 30;
    dispatch({ type: 'set_bottom_tab_height', payload: height });
  } catch (error) {
    console.log(error);
  }
}

export const { Context, Provider } = createDataContext(
  layoutReducer,
  {
    setHeaderHeight,
    setBottomTabHeight
  },
  {
    headerHeight: null,
    bottomTabHeight: null
  }
);