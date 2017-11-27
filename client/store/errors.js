const ADD_ITEM_ERROR = 'ERROR';

export const error = err => ({ type: ADD_ITEM_ERROR, err });


export default (state = '', action) => {
  switch (action.type) {
    case ADD_ITEM_ERROR:
      return action.err;
    default:
      return state;
  }
};
