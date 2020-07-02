import createDataContext from './createDataContext.js';
import { useFetch } from './../hooks/useFetch.js';
import { addStoryToLibrary, removeStoryFromLibrary } from './../constants/network.js';

const libraryReducer = (state, action) => {
  switch (action.type) {
    case 'update_library':
      return { ...state, library: action.payload };
    default:
      return state;
  }
};

const addToLibrary = dispatch => async storyId => {
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await useFetch(addStoryToLibrary, 'PATCH', { id: storyId }, token);
    dispatch({ type: 'update_library', payload: response.payload });
  } catch (error) {
    console.log(error);
  }
}

const removeFromLibrary = dispatch => async storyId => {
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await useFetch(removeStoryFromLibrary, 'PATCH', { id: storyId }, token);
    dispatch({ type: 'update_library', payload: response.payload });
  } catch (error) {
    console.log(error);
  }
}

export const { Context, Provider } = createDataContext(
  libraryReducer,
  { addToLibrary, removeFromLibrary },
  {}
);