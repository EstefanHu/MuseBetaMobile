import createDataContext from './createDataContext.js';

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

export const { Context, Provider } = createDataContext(
  journeyReducer,
  { dockStory, clearDock },
  {
    status: 'inactive',
    storyId: null,
    story: null,
  }
);