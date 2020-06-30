import createDataContext from './createDataContext.js';
import { useFetch } from './../hooks/useFetch.js';
import { loginUrl, registerUrl } from './../constants/network.js';

const authReducer = (state, action) => {
  switch (action.type) {
    case 'add_error':
      return { ...state, errorMessage: action.payload };
    case 'clear_error_message':
      return { ...state, errorMessage: '' }
    case 'register':
      return { errorMessage: '', token: action.payload };
    case 'login':
      return { errorMessage: '', token: action.payload };
    case 'logout':
      return { ...state, errorMessage: '', token: '' };
    default:
      return state;
  }
};

const clearErrorMessage = dispatch => () => {
  dispatch({ type: 'clear_error_message' })
};

const login = dispatch => async ({ payload, callback }) => {
  try {
    const response = await useFetch(loginUrl, 'POST', payload);
    if (response.status !== 'success')
      return dispatch({ type: 'add_error', payload: response.payload });

    await localStorage.setItem('token', response.token);
    dispatch({ type: 'register', payload: response.token });
    callback();
  } catch (err) {
    dispatch({ type: 'add_error', payload: 'Something went wrong with sign up' });
  }
};

const register = dispatch => async ({ payload, callback }) => {
  try {
    if (payload.password.length < 8)
      return dispatch({ type: 'add_error', payload: 'Password is not long enough' });
    if (payload.password !== payload.confirmPassword)
      return dispatch({ type: 'add_error', payload: 'Passwords do not match' });

    const response = await useFetch(registerUrl, 'POST', payload);
    if (response.status !== 'success')
      return dispatch({ type: 'add_error', payload: response.payload });

    await localStorage.setItem('token', response.token);
    dispatch({ type: 'login', payload: response.token });
    callback();
  } catch (err) {
    dispatch({ type: 'add_error', payload: 'Something went wrong with sign in' });
  }
};

const tryLocalLogin = dispatch => async () => {
  const token = await localStorage.getItem('token');
  if (token) dispatch({ type: 'login', payload: token });
};

const logout = dispatch => async () => {
  await localStorage.removeItem('token');
  dispatch({ type: 'logout' });
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { login, register, logout, clearErrorMessage, tryLocalLogin },
  { token: null, errorMessage: '' }
);