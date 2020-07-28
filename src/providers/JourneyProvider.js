import createDataContext from './createDataContext.js';

const journeyReducer = (state, action) => {
  switch (action.type) {
    case 'set_journey':
      return {
        ...state,
        journeyId: action.payload._id,
        journeyTitle: action.payload.title,

      };
    default:
      return state;
  };
};

const setJourney = dispatch => journey =>
  dispatch({ type: 'set_journey', payload: journey });

export const { Context, Provider } = createDataContext(
  journeyReducer,
  {
    setJourney
  },
  {
    journeyId: null,
    journeyTitle: null,
  }
);