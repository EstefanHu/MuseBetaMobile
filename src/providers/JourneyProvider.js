import createDataContext from './createDataContext.js';
import { useFetch } from './../hooks/useFetch.js';

const journeyReducer = (state, action) => {
  switch (action.type) {
    case 'dock_story':
      return { ...state, story: action.payload };
    default:
      return state;
  }
};

const dockStory = dispatch => story =>
  dispatch({ type: 'dock_story', payload: story });


export const { Context, Provider } = createDataContext(
  journeyReducer,
  { dockStory },
  {
    status: 'inactive',
    story: null
  }
);