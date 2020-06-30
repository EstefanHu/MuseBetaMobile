import createDataContext from './createDataContext.js';
import { useFetch } from '../hooks/useFetch.js';
import { profileUrl } from '../constants/network.js';

const profileReducer = (state, action) => {
  switch (action.type) {
    case 'get_me':
      return {
        ...state,
        name: action.payload.name,
        email: action.payload.email,
      }
    default:
      return state;
  }
};

const getMe = dispatch => async () => {
  try {
    const response = await useFetch(profileUrl, 'GET');
    dispatch({ type: 'get_me', payload: response.payload });
  } catch (error) {
    console.log(error);
  }
}

export const { Context, Provider } = createDataContext(
  profileReducer,
  { getMe },
  {}
);