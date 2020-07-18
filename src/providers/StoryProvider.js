import createDataContext from './createDataContext.js';
import { useFetch } from './../hooks/useFetch.js';
import { storyUrl } from '../constants/network.js';

const storyReducer = (state, action) => {
  switch (action.type) {
    case 'set_genre':
      return { ...state, genre: action.payload };
    case 'set_focused_story':
      return { ...state, focusedStoryId: action.payload }
    case 'fetch_near_stories':
      return { ...state, stories: action.payload };
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
    case 'publish_story':
      return {
        ...state,
        stories: [
          ...state.stories,
          action.payload
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
    case 'update_new_story':
      return { ...state, newStory: action.payload };
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
    dispatch({ type: 'fetch_near_stories', payload: response.payload.data });
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

const editStory = dispatch => (id, title, description, genre, body, callback) => {
  dispatch({ type: 'edit_story', payload: { id, title, description, genre, body } });
  callback();
}

const deleteStory = dispatch => id => {
  dispatch({ type: 'delete_story', payload: id });
}

const updateNewStory = dispatch => story =>
  dispatch({ type: 'update_new_story', payload: story });

const publishStory = dispatch => async story => {
  try {
    const response = await useFetch(storyUrl, 'POST', story);
    if (response.status !== 'success')
      return dispatch({ type: 'add_error', payload: response.payload });
    dispatch({ type: 'publish_story', payload: response.payload });
  } catch (error) {
    console.lor(error);
  }
}

export const { Context, Provider } = createDataContext(
  storyReducer,
  {
    setGenre,
    setFocusedStoryId,
    fetchNearStories,
    fetchTopStories,
    fetchSingleStory,
    editStory,
    deleteStory,
    updateNewStory,
    publishStory
  },
  {
    genre: 'All',
    focusedStoryId: null,
    error: null,
    stories: [],
    newStory: {},
    top: []
  }
);