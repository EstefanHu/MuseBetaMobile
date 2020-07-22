import createDataContext from './createDataContext.js';

const searchReducer = (state, action) => {
  switch (action.type) {
    case 'initialize_query':
      return { ...state, initialized: true };
    case 'update_query':
      return { ...state, query: action.payload };
    case 'cancel_query':
      return { ...state, query: null, initialized: false };
    default:
      return state;
  };
};

const initializeQuery = dispatch => () => dispatch({ type: 'initialize_query' });

const updateQuery = dispatch => async query => {
  try {
    dispatch({ type: 'update_query', payload: query });
  } catch (error) {
    console.log(error);
  }
}

const cancelQuery = dispatch => () => dispatch({ type: 'cancel_query' });

export const { Context, Provider } = createDataContext(
  searchReducer,
  {
    initializeQuery,
    updateQuery,
    cancelQuery
  },
  {
    initialized: false,
    query: null
  }
);