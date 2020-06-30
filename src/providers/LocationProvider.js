import createDataContext from './createDataContext.js';

const LocationReducer = (state, action) => {
  switch (action.type) {
    case 'approximate_location':
      return {
        ...state,
        approximateLongitude: action.payload.lon,
        approximateLatitude: action.payload.lat,
        city: action.payload.city,
        region: action.payload.regionName,
      }
    default:
      return state;
  }
}

const approximateLocation = dispatch => async () => {
  const response = await fetch('http://ip-api.com/json');
  const data = await response.json();
  dispatch({ type: 'approximate_location', payload: data });
}

export const { Provider, Context } = createDataContext(
  LocationReducer,
  { approximateLocation },
  {
    approximateLongitude: null,
    approximateLatitude: null,
    longitude: null,
    latitude: null,
    city: null,
    region: null
  }
)