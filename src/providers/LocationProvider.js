import createDataContext from './createDataContext.js';
import { Linking, Alert } from 'react-native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { useFetch } from './../hooks/useFetch.js';

const LocationReducer = (state, action) => {
  switch (action.type) {
    case 'add_error':
      return { ...state, errorMessage: action.payload }
    case 'clear_error_message':
      return { ...state, errorMessage: '' }
    case 'approximate_location':
      return {
        ...state,
        city: action.payload.city,
        region: action.payload.regionName,
        zip: action.payload.zip,
      }
    case 'get_location':
      return {
        ...state,
        longitude: action.payload.coords.longitude,
        latitude: action.payload.coords.latitude
      }
    default:
      return state;
  }
}

const addErrorMessage = dispatch => message =>
  dispatch({ type: 'add_error', payload: message });

const clearErrorMessage = dispatch => () =>
  dispatch({ type: 'clear_error_message' });

const approximateLocation = dispatch => async () => {
  try {
    const response = await fetch('http://ip-api.com/json');
    const data = await response.json();
    if (data.status !== 'success') return dispatch({ type: 'add_error', payload: data });
    dispatch({ type: 'approximate_location', payload: data });
  } catch (error) {
    console.log(error);
  };
};

const getCoords = dispatch => async () => {
  try {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    let location;
    if (status === 'granted') {
      location = await Location.getCurrentPositionAsync({});
    } else {
      Alert.alert(
        'Grant Location',
        'Permission is required for :Muse explore feature',
        [
          {
            text: 'Later',
            style: 'cancel'
          },
          {
            text: 'Settings',
            onPress: () => Linking.openSettings(),
          }
        ],
        { cancelable: false }
      )
    }
    dispatch({ type: 'get_location', payload: location });
  } catch (error) {
    console.log(error)
  }
}

const beginNavigation = dispatch = async () => {
  try {
    const response = await useFetch()
  } catch (error) {
    console.log(error);
  }
}

export const { Provider, Context } = createDataContext(
  LocationReducer,
  { addErrorMessage, clearErrorMessage, approximateLocation, getCoords },
  {
    errorMessage: '',
    longitude: null,
    latitude: null,
    city: null,
    region: null,
    zip: null
  }
)