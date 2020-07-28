import createDataContext from './createDataContext.js';

const journeyReducer = (state, action) => {
  switch (action.type) {
    default:
      return state;
  };
};

export const { Context, Provider } = createDataContext(
  journeyReducer,
  {},
  {}
);