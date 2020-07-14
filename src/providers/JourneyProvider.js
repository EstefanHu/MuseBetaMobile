import createDataContext from './createDataContext.js';
import { useFetch } from './../hooks/useFetch.js';
import { storyUrl } from './../constants/network.js';

const journeyReducer = (state, action) => {
  switch (action.type) {
    case 'dock_story':
      return {
        ...state,
        status: 'docked',
        storyId: action.payload
      };
    case 'clear_dock':
      return {
        ...state,
        status: 'inactive',
        storyId: null,
        story: null
      };
    default:
      return state;
  }
};

const dockStory = dispatch => storyId =>
  dispatch({ type: 'dock_story', payload: storyId });

const clearDock = dispatch => () =>
  dispatch({ type: 'clear_dock' });

const fetchJourney = dispatch => async id => {
  try {
    const response = await useFetch(`${storyUrl}/${id}`, 'GET', null);
    if (response.status !== 'success')
      return dispatch({ status: 'add_error', payload: response.payload });
    dispatch({ type: 'fetch_journey', payload: response.payload });
    return response.payload;
  } catch (error) {
    console.log(error);
  }
}

export const { Context, Provider } = createDataContext(
  journeyReducer,
  { dockStory, clearDock, fetchJourney },
  {
    status: 'inactive',
    storyId: null,
    story: null,
  }
);