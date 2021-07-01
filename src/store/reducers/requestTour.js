import * as actionTypes from '../actions/actionTypes';

const initialState = {
  loading: false,
  error: null,
  fetchError: null,
  deleteError: null,
  requestedTours: [],
  requestedTourDeleteId: null
};

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case(actionTypes.REQ_TOUR_START):
      return {
        ...state,
        loading: true,
        error: null
      };
    case(actionTypes.REQ_TOUR_SUCCESS):
      return {
        ...state,
        loading: false,
        error: null
      };
    case(actionTypes.REQ_TOUR_FAILED):
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case(actionTypes.REQ_CLEAR_ERROR):
      return {
        ...state,
        error: null
      };
    case(actionTypes.FETCH_REQ_TOURS_START):
      return {
        ...state,
        loading: true,
        fetchError: null
      };
    case(actionTypes.FETCH_REQ_TOURS_SUCCESS):
      return {
        ...state,
        loading: false,
        fetchError: null,
        requestedTours: action.tourData
      };
    case(actionTypes.FETCH_REQ_TOURS_FAILED):
      return {
        ...state,
        loading: false,
        fetchError: action.error
      };
    case(actionTypes.FETCH_REQ_TOURS_CLEAR_ERROR):
      return {
        ...state,
        fetchError: null
      };
    case(actionTypes.REQ_TOUR_DELETE_SUCCESS):
      let updatedReqTours = state.requestedTours.filter(tour => tour.id !== action.tourId);
      return {
        ...state,
        requestedTours: updatedReqTours
      };
    case(actionTypes.REQ_TOUR_DELETE_FAILED):
      return {
        ...state,
        loading: false,
        deleteError: action.error
      };
    case(actionTypes.REQ_TOURS_CLEAR_ALL_START):
      return {
        ...state,
        loading: true,
        deleteError: null
      };
    case(actionTypes.REQ_TOURS_CLEAR_ALL_SUCCESS):
      return {
        ...state,
        loading: false,
        deleteError: null,
        requestedTours: []
      };
    case(actionTypes.REQ_TOURS_CLEAR_ALL_FAILED):
      return {
        ...state,
        loading: false,
        deleteError: action.error
      };
    case(actionTypes.CLEAR_REQ_TOUR_DELETE_ERROR):
      return {
        ...state,
        deleteError: null
      };
    default:
      return state;
  }
};

export default reducer;