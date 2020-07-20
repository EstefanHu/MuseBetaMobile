import createDataContext from './createDataContext.js';

const nearReducer = (state, action) => {
  switch (action.type) {
    case 'dock_story':
      return {
        ...state,
        status: 'docked',
        story: action.payload
      };
    case 'clear_dock':
      return {
        ...state,
        status: 'inactive',
        story: null
      };
    default:
      return state;
  }
};

const dockStory = dispatch => story =>
  dispatch({ type: 'dock_story', payload: story });

const clearDock = dispatch => () =>
  dispatch({ type: 'clear_dock' });

export const { Context, Provider } = createDataContext(
  nearReducer,
  { dockStory, clearDock },
  {
    status: 'inactive',
    story: null,
  }
);