import createDataContext from './createDataContext.js';

const SearchReducer = (state, action) => {
  switch(action.type) {
    default: 
    return state;
  };
};

export const { Context, Provider } = createDataContext(
  searchReducer,
  {
  },
  {
  }
);