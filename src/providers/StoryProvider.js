import createDataContext from './createDataContext.js';
import { useFetch } from './../hooks/useFetch.js';
import { storyUrl } from '../constants/network.js';
import { AsyncStorage } from 'react-native';

const storyReducer = (state, action) => {
  switch (action.type) {
    case 'set_genre':
      return { ...state, genre: action.payload };
    case 'set_focused_story':
      return { ...state, focusedStoryId: action.payload }
    case 'fetch_top_stories':
      return { ...state, top: action.payload };
    case 'fetch_single_story':
      return {
        ...state,
        stories:
          state.stories
            .filter(s => s._id !== action.payload._id)
            .push(action.payload)
      };
    case 'add_story':
      return {
        ...state,
        stories: [
          ...state.stories, {
            id: action.payload._id,
            title: action.payload.title,
            pitch: action.payload.pitch,
            genre: action.payload.genre,
            startLocation: action.payload.startLocation,
            body: action.payload.body
          }
        ]
      };
    case 'edit_story':
      return state.map(story => {
        return story.id === action.payload.id
          ? action.payload
          : story;
      });
    case 'delete_story':
      return state.filter(story => story.id !== action.payload);
    case 'add_error':
      return { ...state, error: action.payload };
    case 'remove_error':
      return { ...state, error: null };
    default:
      return state;
  }
};

const setGenre = dispatch => genre => {
  dispatch({ type: 'set_genre', payload: genre });
}

const setFocusedStoryId = dispatch => storyId => {
  dispatch({ type: 'set_focused_story', payload: storyId });
}

const fetchNearStories = dispatch => async (distance, lon, lat, unit) => {
  try {
    const URL = `${storyUrl}/story-within/${distance}/center/${lon},${lat}/unit/${unit}`
    const response = await useFetch(URL, 'GET', null);
    if (response.status !== 'success') return dispatch({ type: 'add_error', payload: response.payload });
    dispatch({ type: 'fetch_near_stories', payload: response.payload });
  } catch (error) {
    console.log(error);
  }
}

const fetchTopStories = dispatch => async city => {
  try {
    const response = await useFetch(`${storyUrl}?city=${city}`, 'GET', null);
    if (response.status !== 'success') return dispatch({ type: 'add_error', payload: response.payload });
    dispatch({ type: 'fetch_top_stories', payload: response.payload });
  } catch (error) {
    console.log(error);
  }
}

const fetchSingleStory = dispatch => async id => {
  try {
    const response = await useFetch(storyUrl + '/' + id, 'GET', null);
    if (response.status !== 'status') return dispatch({ type: 'added_error', payload: response.payload });
    dispatch({ type: 'fetch_single_story', payload: response.payload });
  } catch (error) {
    console.log(error);
  }
}

const addStory = dispatch => async story => {
  try {
    const response = await fetch(storyUrl, 'POST', story);
    if (response.status === 'failure') return dispatch({ type: 'add_error', payload: response.payload });
    dispatch({ type: 'add_story', payload: response.payload });
  } catch (error) {
    console.log(error);
  }
}

const editStory = dispatch => (id, title, description, genre, body, callback) => {
  dispatch({ type: 'edit_story', payload: { id, title, description, genre, body } });
  callback();
}

const deleteStory = dispatch => id => {
  dispatch({ type: 'delete_story', payload: id });
}

export const { Context, Provider } = createDataContext(
  storyReducer,
  {
    setGenre,
    setFocusedStoryId,
    fetchNearStories,
    fetchTopStories,
    fetchSingleStory,
    addStory,
    editStory,
    deleteStory
  },
  {
    genre: 'All',
    focusedStoryId: null,
    error: null,
    stories: [],
    top: []
  }
);