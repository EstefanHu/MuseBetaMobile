import createDataContext from './createDataContext.js';
import { useFetch } from './../hooks/useFetch.js';

const journeyReducer = (state, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export const { Context, Provider } = createDataContext(
  journeyReducer,
  {},
  {
    status: 'inactive',
    story: null
  }
);