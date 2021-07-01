import * as actionTypes from './actionTypes';
import axios from 'axios';


// LEAVE REVIEW
const leaveReviewStart = (form) => {
  return {
    type: actionTypes.LEAVE_REVIEW_START,
    form
  };
};

const leaveReviewSuccess = (revData, form) => {
  return {
    type: actionTypes.LEAVE_REVIEW_SUCCESS,
    revData,
    form
  };
};

const leavReviewFailed = (error) => {
  return {
    type: actionTypes.LEAVE_REVIEW_FAILED,
    error
  };
};

export const leaveReview = (revData, form, token) => {
  return dispatch => {
    dispatch(leaveReviewStart(form));

    let url;
    if(form === "agencyReview") {
      url = "https://lucid-tours-default-rtdb.firebaseio.com/agencyReview.json?auth=" + token;
    }
    if(form === "tourReview") {
      url = "https://lucid-tours-default-rtdb.firebaseio.com/tourReviews.json?auth=" + token;
    }

    axios.post(url, revData)
      .then(response => {
        dispatch(leaveReviewSuccess(revData, form));
      })
      .catch(error => {
        dispatch(leavReviewFailed(error));
      })
  };
};

export const leaveReviewClearError = () => {
  return {
    type: actionTypes.LEAVE_REVIEW_CLEAR_ERROR
  };
};

// FETCHING
// 1.fetch agency review
const fetchAgencyReviewStart = () => {
  return {
    type: actionTypes.FETCH_AGENCY_REVIEW_START
  };
};

const fetchAgencyReviewSuccess = (reviews) => {
  return {
    type: actionTypes.FETCH_AGENCY_REVIEW_SUCCESS,
    reviews
  };
};

const fetchAgencyReviewFailed = (error) => {
  return {
    type: actionTypes.FETCH_AGENCY_REVIEW_FAILED,
    error
  };
};

export const fetchAgencyReview = (token, userId) => {
  return dispatch => {
    dispatch(fetchAgencyReviewStart());
    const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';

    axios.get("https://lucid-tours-default-rtdb.firebaseio.com/agencyReview.json" + queryParams)
      .then(response => {
        let fetchedReview;
        
        for(const key in response.data) {
          fetchedReview = response.data[key]
        }
        dispatch(fetchAgencyReviewSuccess(fetchedReview));
      })
      .catch(error => {
        dispatch(fetchAgencyReviewFailed(error));
      })
  };
};

// 2.fetch tours reviews
const fetchTourReviewsStart = () => {
  return {
    type: actionTypes.FETCH_TOUR_REVIEWS_START
  };
};

const fetchTourReviewsSuccess = (reviews) => {
  return {
    type: actionTypes.FETCH_TOUR_REVIEWS_SUCCESS,
    reviews
  };
};

const fetchTourReviewsFailed = (error) => {
  return {
    type: actionTypes.FETCH_TOUR_REVIEWS_FAILED,
    error
  };
};

export const fetchTourReviews = (token, userId) => {
  return dispatch => {
    dispatch(fetchTourReviewsStart());
    const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';

    axios.get("https://lucid-tours-default-rtdb.firebaseio.com/tourReviews.json" + queryParams)
      .then(response => {
        let tourReviews = [];
        for(const key in response.data) {
          tourReviews.push({
            ...response.data[key],
            id: key
          });
        }
        dispatch(fetchTourReviewsSuccess(tourReviews));
      })
      .catch(error => {
        dispatch(fetchTourReviewsFailed(error));
      })
  };
};

// remove agency review

const removeAgencyReviewSuccess = (revId) => {
  return {
    type: actionTypes.REMOVE_AGENCY_REVIEW_SUCCESS,
    revId
  };
};

const removeAgencyReviewFailed = (error) => {
  return {
    type: actionTypes.REMOVE_AGENCY_REVIEW_FAILED,
    error
  };
};

export const removeAgencyReview = (revId, token) => {
  return dispatch => {
    axios.delete("https://lucid-tours-default-rtdb.firebaseio.com/agencyReview.json?auth=" + token)
      .then(response => {
        dispatch(removeAgencyReviewSuccess(revId));
      })
      .catch(error => {
        dispatch(removeAgencyReviewFailed(error));
      })
  };
};

// remove tour review

const removeTourReviewSuccess = (revId) => {
  return {
    type: actionTypes.REMOVE_TOUR_REVIEW_SUCCESS,
    revId
  };
};

const removeTourReviewFailed = (error) => {
  return {
    type: actionTypes.REMOVE_TOUR_REVIEW_FAILED,
    error
  };
};

export const removeTourReview = (revId, token) => {
  return dispatch => {
    axios.delete(`https://lucid-tours-default-rtdb.firebaseio.com/tourReviews/${revId}.json?auth=` + token)
      .then(response => {
        dispatch(removeTourReviewSuccess(revId));
      })
      .catch(error => {
        dispatch(removeTourReviewFailed(error));
      })
  };
};

