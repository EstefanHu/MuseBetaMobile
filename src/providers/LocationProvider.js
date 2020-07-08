import createDataContext from './createDataContext.js';

const LocationReducer = (state, action) => {
  switch (action.type) {
    case 'add_error':
      return { ...state, errorMessage: action.payload }
    case 'clear_error_message':
      return { ...state, errorMessage: '' }
    case 'approximate_location':
      return {
        ...state,
        approximateLongitude: action.payload.lon,
        approximateLatitude: action.payload.lat,
        city: action.payload.city,
        region: action.payload.regionName,
        zip: action.payload.zip,
      }
    case 'set_status':
      return { ...state, status: action.payload }
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

const setStatus = dispatch => status =>
  dispatch({ type: 'set_status', payload: status });

export const { Provider, Context } = createDataContext(
  LocationReducer,
  { addErrorMessage, clearErrorMessage, approximateLocation, setStatus },
  {
    status: null,
    errorMessage: '',
    approximateLongitude: null,
    approximateLatitude: null,
    longitude: null,
    latitude: null,
    city: null,
    region: null,
    zip: null
  }
)