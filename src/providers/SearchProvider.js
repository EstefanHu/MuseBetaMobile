import createDataContext from './createDataContext.js';
import AsyncStorage from '@react-native-community/async-storage';

const searchReducer = (state, action) => {
  switch (action.type) {
    case 'get_history':
      return { ...state, history: action.payload };
    case 'clear_history':
      return { ...state, history: [] };
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

const getHistory = dispatch => async () => {
  try {
    const history = await AsyncStorage.getItem('SearchHistory');
    dispatch({ type: 'get_history', payload: history ? history : [] });
  } catch (error) {
    console.log(error);
  };
};

const clearHistory = dispatch => async () => {
  try {
    await AsyncStorage.removeItem('SearchHistory');
    dispatch({ type: 'clear_history' });
  } catch (error) {
    console.log(error);
  };
};

const initializeQuery = dispatch => () => dispatch({ type: 'initialize_query' });

const updateQuery = dispatch => async query => {
  try {
    dispatch({ type: 'update_query', payload: query });
  } catch (error) {
    console.log(error);
  };
};

const cancelQuery = dispatch => () => dispatch({ type: 'cancel_query' });

export const { Context, Provider } = createDataContext(
  searchReducer,
  {
    getHistory,
    clearHistory,
    initializeQuery,
    updateQuery,
    cancelQuery
  },
  {
    initialized: false,
    query: null,
    history: [],
    results: []
  }
);