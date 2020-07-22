import createDataContext from './createDataContext.js';

const searchReducer = (state, action) => {
  switch (action.type) {
    case 'update_query':
      return { ...state, query: action.payload }
    case 'cancel_query':
      return { ...state, query: null }
    default:
      return state;
  };
};

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
    updateQuery,
    cancelQuery
  },
  {
    query: null
  }
);