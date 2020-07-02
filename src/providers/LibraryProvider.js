import createDataContext from './createDataContext.js';
import { useFetch } from './../hooks/useFetch.js';
import { getLibrary, addStoryToLibrary, removeStoryFromLibrary } from './../constants/network.js';
import { AsyncStorage } from 'react-native';

const libraryReducer = (state, action) => {
  switch (action.type) {
    case 'add_error':
      return { ...state, errorMessage: action.payload };
    case 'fetch_library':
      return { ...state, library: action.payload };
    case 'update_library':
      return { ...state, library: action.payload };
    default:
      return state;
  }
};

const fetchLibrary = async () => {
  try {
    const token = AsyncStorage.getItem('token');
    const response = await useFetch(getLibrary, 'GET', null, token);
    if (response.status !== 'success') return dispatch({ type: 'add_error', payload: response.payload });
    dispatch({ type: 'fetch_library', payload: response.payload });
  } catch (error) {
    console.log(error);
  }
}

const addToLibrary = dispatch => async storyId => {
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await useFetch(addStoryToLibrary, 'PATCH', { id: storyId }, token);
    if (response.status !== 'success') return dispatch({ type: 'add_error', payload: response.payload });
    dispatch({ type: 'update_library', payload: response.payload });
  } catch (error) {
    console.log(error);
  }
}

const removeFromLibrary = dispatch => async storyId => {
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await useFetch(removeStoryFromLibrary, 'PATCH', { id: storyId }, token);
    if (response.status !== 'success') return dispatch({ type: 'add_error', payload: response.payload });
    dispatch({ type: 'update_library', payload: response.payload });
  } catch (error) {
    console.log(error);
  }
}
export const { Context, Provider } = createDataContext(
  libraryReducer,
  { fetchLibrary, addToLibrary, removeFromLibrary },
  {
    library: []
  }
);