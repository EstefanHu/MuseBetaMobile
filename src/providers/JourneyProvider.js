import createDataContext from './createDataContext.js';

const journeyReducer = (state, action) => {
  switch (action.type) {
    case 'set_journey':
      return {
        ...state,
        id: action.payload._id,
        title: action.payload.title,
        pitch: action.payload.pitch,
        body: action.payload.body, // TODO: Temporary solution
        channel: action.payload.channel,
        journeyStartLocation: action.payload.startLocation,
        locations: action.payload.locations,
        city: action.payload.city,
        community: action.payload.community,
        authorName: action.payload.authorName,
        authorId: action.payload.authorId,
        createdAt: action.payload.createdAt,
        credibility: action.payload.credibility,
      };
    case 'clear_journey':
      return { id: null, step: state.step };
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
    id: null,
    step: 0,
  }
);