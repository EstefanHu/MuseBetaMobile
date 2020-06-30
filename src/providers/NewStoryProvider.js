import createDataContext from './createDataContext.js';

const newStoryReducer = (state, action) => {
  switch (action.type) {
    case 'update_story':
      return { ...state, status: action.payload };
    case 'add_title':
      return { ...state, title: action.payload };
    case 'add_genre':
      return { ...state, genre: action.payload };
    case 'add_pitch':
      return { ...state, pitch: action.payload };
    case 'add_coordinates':
      return {
        ...state,
        longitude: action.payload.longitude,
        latitude: action.payload.latitude,
        startLocation: {
          coordinates: [action.payload.longitude, action.payload.latitude],
          address: "", // TODO: FILL OUT META DATA
          description: "",
        }
      };
    case 'add_body':
      return { ...state, body: action.payload };
    case 'add_error':
      return { ...state, error: action.payload.error };
    default:
      return state;
  }
};

const updateStatus = dispatch => status => {
  dispatch({ type: 'update_story', payload: status });
}

const addTitle = dispatch => title => {
  dispatch({ type: 'add_title', payload: title });
}

const addGenre = dispatch => genre => {
  dispatch({ type: 'add_genre', payload: genre });
}

const addPitch = dispatch => pitch => {
  dispatch({ type: 'add_pitch', payload: pitch });
}

const addCoordinates = dispatch => coordinates => {
  let longitude = coordinates[0];
  let latitude = coordinates[1];
  dispatch({
    type: 'add_coordinates',
    payload: { longitude, latitude }
  });
}

const addBody = dispatch => body => {
  dispatch({ type: 'add_body', payload: body });
}

export const { Context, Provider } = createDataContext(
  newStoryReducer,
  { updateStatus, addTitle, addGenre, addPitch, addCoordinates, addBody },
  {
    status: 'inactive',
    error: null,
  }
);