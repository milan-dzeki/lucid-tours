import * as actionTypes from '../actions/actionTypes';

const initialState = {
  loading: false,
  error: null
};

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case(actionTypes.BOOK_TOUR_START):
      return {
        ...state,
        loading: true
      };
    case(actionTypes.BOOK_TOUR_SUCCESS):
      return {
        ...state,
        loading: false,
        error: null
      };
    case(actionTypes.BOOK_TOUR_FAILED):
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case(actionTypes.BOOK_CLEAR_ERROR):
      return {
        ...state,
        error: null
      };
    default:
      return state;
  }
};

export default reducer;