import createDataContext from './createDataContext.js';
import { NO_BEZEL } from './../constants/ios.js';
import * as Device from 'expo-device';

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
        topInset: NO_BEZEL.includes(Device.modelId) ? 24 : 20,
        bottomInset: NO_BEZEL.includes(Device.modelId) ? 34 : 30
      }
    })
  } catch (error) {
    console.log(error);
  }
}

export const { Context, Provider } = createDataContext(
  layoutReducer,
  {
    setHeaderHeight,
    setInsets,
  },
  {
    headerHeight: null,
    topInset: null,
    bottomInset: null
  }
);