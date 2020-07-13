import createDataContext from './createDataContext.js';
import { useFetch } from './../hooks/useFetch.js';

const journeyReducer = (state, action) => {
  switch (action.type) {
    case 'dock_story':
      return {
        ...state,
        status: 'docked',
        storyId: action.payload
      };
    case 'complete_story':
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

const completeStory = dispatch => () =>
  dispatch({ type: 'complete_story' });

export const { Context, Provider } = createDataContext(
  journeyReducer,
  { dockStory, completeStory },
  {
    status: 'inactive',
    storyId: null,
    story: null,
  }
);