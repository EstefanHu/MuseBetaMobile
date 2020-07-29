import createDataContext from './createDataContext.js';

const journeyReducer = (state, action) => {
  switch (action.type) {
    case 'set_journey':
      return {
        ...state,
        journeyId: action.payload._id,
        journeyTitle: action.payload.title,
        journeyStartLocation: action.payload.startLocation
      };
    case 'clear_journey':
      return { ...state, journeyId: null };
    default:
      return state;
  };
};

const setJourney = dispatch => journey =>
  dispatch({ type: 'set_journey', payload: journey });

const clearJourney = dispatch => () =>
  dispatch({ type: 'clear_journey' });

export const { Context, Provider } = createDataContext(
  journeyReducer,
  {
    setJourney,
    clearJourney,
  },
  {
    journeyId: null,
    journeyTitle: null,
    journeyStartLocation: null
  }
);