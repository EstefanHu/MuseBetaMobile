import createDataContext from './createDataContext.js';

const journeyReducer = (state, action) => {
  switch (action.type) {
    case 'set_journey':
      return {
        ...state,
        journeyId: action.payload._id,
        journeyStartLocation: action.payload.startLocation,
        locations: action.payload.locations,
      };
    case 'clear_journey':
      return { ...state, journeyId: null };
    case 'next_step':
      return { ...state, step: state.step + 1 };
    case 'reset_step':
      return { ...state, step: 0 };
    default:
      return state;
  };
};

const setJourney = dispatch => journey =>
  dispatch({ type: 'set_journey', payload: journey });

const clearJourney = dispatch => () =>
  dispatch({ type: 'clear_journey' });

const nextStep = dispatch => () =>
  dispatch({ type: 'next_step' });

const resetStep = dispatch => () =>
  dispatch({ type: 'reset_step' });

export const { Context, Provider } = createDataContext(
  journeyReducer,
  {
    setJourney,
    clearJourney,
    nextStep,
    resetStep
  },
  {
    journeyId: null,
    journeyStartLocation: null,
    locations: null,
    step: 0,
  }
);