import * as actionTypes from '../actions/actionTypes';

const initialState = {
  agencyReview: null,
  tourReviews: [],
  form: "",
  sendReviewLoading: false,
  fetchAgencyReviewLoading: false,
  fetchTourReviewsLoading: false,
  sendReviewError: null,
  fetchAgencyRevewError: null,
  fetchTourReviewsError: null,
  deleteReviewLoading: false,
  deleteReviewError: null
};

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case(actionTypes.LEAVE_REVIEW_START):
      return {
        ...state,
        sendReviewLoading: true,
        form: action.form
      };
    case(actionTypes.LEAVE_REVIEW_SUCCESS):
      return {
        ...state,
        sendReviewLoading: false,
        form: ""
      };
    case(actionTypes.LEAVE_REVIEW_FAILED):
      return {
        ...state,
        sendReviewLoading: false,
        sendReviewError: action.error
      };
    case(actionTypes.LEAVE_REVIEW_CLEAR_ERROR):
      return {
        ...state,
        sendReviewError: null
      };
    case(actionTypes.FETCH_AGENCY_REVIEW_START):
      return {
        ...state,
        fetchAgencyReviewLoading: true
      };
    case(actionTypes.FETCH_AGENCY_REVIEW_SUCCESS):
      let updatedAgencyReview;
      if(!action.reviews) {
        updatedAgencyReview = null
      } else {
        updatedAgencyReview = action.reviews;
      }
      return {
        ...state,
        fetchAgencyReviewLoading: false,
        agencyReview: updatedAgencyReview
      };
    case(actionTypes.FETCH_AGENCY_REVIEW_FAILED):
      return {
        ...state,
        fetchAgencyReviewLoading: false,
        fetchAgencyRevewError: action.error
      };
    case(actionTypes.FETCH_TOUR_REVIEWS_START):
      return {
        ...state,
        fetchTourReviewsLoading: true
      };
    case(actionTypes.FETCH_TOUR_REVIEWS_SUCCESS):
      return {
        ...state,
        fetchTourReviewsLoading: false,
        tourReviews: action.reviews
      };
    case(actionTypes.FETCH_TOUR_REVIEWS_FAILED):
      return {
        ...state,
        fetchTourReviewsLoading: false,
        fetchTourReviewsError: action.error
      };
    case(actionTypes.REMOVE_AGENCY_REVIEW_SUCCESS):
      return {
        ...state,
        agencyReview: null
      };
    case(actionTypes.REMOVE_AGENCY_REVIEW_FAILED):
      return {
        ...state,
        deleteReviewError: action.error
      };
    case(actionTypes.REMOVE_TOUR_REVIEW_SUCCESS):
      let updatedTourReviews = state.tourReviews.filter(tour => tour.id !== action.revId);
      return {
        ...state,
        tourReviews: updatedTourReviews
      };
    case(actionTypes.REMOVE_TOUR_REVIEW_FAILED):
      return {
        ...state,
        deleteReviewError: action.error
      };
    default:
      return state;
  }
};

export default reducer;