import createDataContext from './createDataContext.js';
import {
} from './../constants/network.js';
import { useFetch } from '../hooks/useFetch.js';
import {
  profileUrl,
  getLibrary,
  addStoryToLibrary,
  removeStoryFromLibrary
} from '../constants/network.js';
import { AsyncStorage } from 'react-native';

const profileReducer = (state, action) => {
  switch (action.type) {
    case 'add_error':
      return { ...state, errorMessage: action.payload }
    case 'clear_error_message':
      return { ...state, errorMessage: '' }
    case 'get_me':
      return {
        ...state,
        name: action.payload.name,
        email: action.payload.email,
        library: action.payload.library,
      }
    case 'fetch_library':
      return { ...state, library: action.payload };
    case 'update_library':
      return { ...state, library: action.payload };
    case 'add_story_to_library':
      return {
        ...state,
        library: [...state.library, action.payload]
      }
    case 'remove_story_from_library':
      return {
        ...state,
        library: state.library.filter(item => item === action.payload)
      }
    default:
      return state;
  }
};

const getMe = dispatch => async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await useFetch(profileUrl, 'GET', null, token);
    if (response.status !== 'success') return dispatch({ type: 'add_error', payload: response.payload });
    dispatch({ type: 'get_me', payload: response.payload });
  } catch (error) {
    console.log(error);
  }
}

const fetchLibrary = dispatch => async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await useFetch(getLibrary, 'GET', null, token);
    if (response.status !== 'success') return dispatch({ type: 'add_error', payload: response.payload });
    dispatch({ type: 'fetch_library', payload: response.payload });
  } catch (error) {
    console.log(error);
  }
}

const addToLibrary = dispatch => async storyId => {
  try {
    console.log('adding');
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
    console.log('removing');
    const token = await AsyncStorage.getItem('token');
    const response = await useFetch(removeStoryFromLibrary, 'PATCH', { id: storyId }, token);
    if (response.status !== 'success') return dispatch({ type: 'add_error', payload: response.payload });
    dispatch({ type: 'update_library', payload: response.payload });
  } catch (error) {
    console.log(error);
  }
}

const updateLibrary = dispatch => id => {
  dispatch({ type: 'update_library', payload: id });
}

export const { Context, Provider } = createDataContext(
  profileReducer,
  { getMe, fetchLibrary, addToLibrary, removeFromLibrary },
  {
    name: null,
    email: null,
    role: null,
    type: null,
    libraryIds: [],
    library: [],
    credibility: null,
    photo: null
  }
);