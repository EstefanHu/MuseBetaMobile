import createDataContext from './createDataContext.js';

const layoutReducer = (state, action) => {
  switch (action.type) {
    case 'set_primary_header_height':
      return { ...state, primaryHeaderHeight: action.payload }
    default:
      return state;
  }
};

const setPrimaryHeaderHeight = dispatch => height =>
  dispatch({ type: 'set_primary_header_height', payload: height });


export const { Context, Provider } = createDataContext(
  layoutReducer,
  {
    setPrimaryHeaderHeight
  },
  {
    primaryHeaderHeight: null,
  }
);