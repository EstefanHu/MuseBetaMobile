import createDataContext from './createDataContext.js';
import { useFetch } from '../hooks/useFetch.js';
import {
  profileUrl,
  updateMeUrl,
  getLibrary,
  storyUrl,
  addStoryToLibrary,
  removeStoryFromLibrary
} from '../constants/network.js';

const profileReducer = (state, action) => {
  switch (action.type) {
    case 'add_error':
      return { ...state, errorMessage: action.payload }
    case 'clear_error_message':
      return { ...state, errorMessage: '' }
    case 'get_me':
      return {
        ...state,
        id: action.payload._id,
        name: action.payload.name,
        email: action.payload.email,
        links: action.payload.links,
        libraryIds: action.payload.library,
        credibility: action.payload.credibility,
        role: action.payload.role,
        type: action.payload.type,
        photo: action.payload.photo
      }
    case 'upload_profile_photo':
      return { ...state, photo: action.payload };
    case 'fetch_library':
      return { ...state, library: action.payload };
    case 'add_to_library':
      return {
        ...state,
        libraryIds: [...state.libraryIds, action.payload._id],
        library: [...state.library, action.payload]
      };
    case 'remove_from_library':
      return {
        ...state,
        libraryIds: state.libraryIds.filter(storyId => storyId !== action.payload),
        library: state.library.filter(story => story._id !== action.payload)
      };
    case 'fetch_stories':
      return { ...state, stories: action.payload };
    default:
      return state;
  }
};

const clearErrorMessage = dispatch => () => {
  dispatch({ type: 'clear_error_message' })
};

const getMe = dispatch => async () => {
  try {
    const response = await useFetch(profileUrl, 'GET', null);
    if (response.status !== 'success')
      return dispatch({ type: 'add_error', payload: response.payload });
    dispatch({ type: 'get_me', payload: response.payload });
  } catch (error) {
    console.log(error);
  }
}

const uploadProfilePhoto = dispatch => async photo => {
  try {
    let localUri = photo;
    let filename = localUri.split('/').pop();
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;

    let formData = new FormData();
    formData.append('photo', { uri: localUri, name: filename, type });

    const response = await useFetch(updateMeUrl, 'PATCH', formData);
    if (response.status !== 'success')
      return dispatch({ type: 'add_error', payload: response.payload });
    dispatch({ type: 'upload_profile_photo', payload: response.payload.photo });
  } catch (error) {
    console.log(error);
  }
}

const fetchLibrary = dispatch => async () => {
  try {
    const response = await useFetch(getLibrary, 'GET', null);
    if (response.status !== 'success')
      return dispatch({ type: 'add_error', payload: response.payload });
    dispatch({ type: 'fetch_library', payload: response.payload });
  } catch (error) {
    console.log(error);
  }
}

const addToLibrary = dispatch => async storyId => {
  try {
    const response = await useFetch(addStoryToLibrary, 'PATCH', { id: storyId });
    if (response.status !== 'success')
      return dispatch({ type: 'add_error', payload: response.payload });
    dispatch({ type: 'add_to_library', payload: response.payload });
  } catch (error) {
    console.log(error);
  }
}

const removeFromLibrary = dispatch => async storyId => {
  try {
    const response = await useFetch(removeStoryFromLibrary, 'PATCH', { id: storyId });
    if (response.status !== 'success')
      return dispatch({ type: 'add_error', payload: response.payload });
    dispatch({ type: 'remove_from_library', payload: response.payload });
  } catch (error) {
    console.log(error);
  }
}

const fetchStories = dispatch => async authorId => {
  try {
    const response = await useFetch(storyUrl + `?authorId=${authorId}`, 'GET', null);
    if (response.status !== 'success')
      return dispatch({ type: 'add_error', payload: response.payload });
    dispatch({ type: 'fetch_stories', payload: response.payload });
  } catch (error) {
    console.log(error);
  };
};

const updateProfile = dispatch => async body => {
  try {
    const response = await useFetch(updateMeUrl, 'PATCH', body);
    if (response.status !== 'success')
      return dispatch({ type: 'add_error', paylaod: response.payload });
    dispatch({ type: 'get_me', payload: response.payload });
  } catch (error) {
    console.log(error);
  }
}

export const { Context, Provider } = createDataContext(
  profileReducer,
  {
    clearErrorMessage,
    getMe,
    uploadProfilePhoto,
    fetchLibrary,
    addToLibrary,
    removeFromLibrary,
    fetchStories,
    updateProfile,
  },
  {
    id: null,
    name: null,
    email: null,
    role: null,
    type: null,
    links: [],
    libraryIds: [],
    library: [],
    stories: [],
    credibility: null,
    photo: null
  }
);