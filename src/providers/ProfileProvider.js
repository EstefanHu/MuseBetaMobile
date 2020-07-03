import createDataContext from './createDataContext.js';
import {
} from './../constants/network.js';
import { useFetch } from '../hooks/useFetch.js';
import { profileUrl } from '../constants/network.js';
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
    default:
      return state;
  }
};

const getMe = dispatch => async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await useFetch(profileUrl, 'GET', null, token);
    // console.log(response.data.data)
    if (response.status !== 'success') return dispatch({ type: 'add_error', payload: response.payload });
    dispatch({ type: 'get_me', payload: response.data });
  } catch (error) {
    console.log(error);
  }
}

export const { Context, Provider } = createDataContext(
  profileReducer,
  { getMe },
  {
    name: null,
    email: null,
    role: null,
    type: null,
    library: [],
    credibility: null,
    photo: null
  }
);