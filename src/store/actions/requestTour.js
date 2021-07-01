import * as actionTypes from './actionTypes';
import axios from 'axios';

// request tour 
const reqTourStart = () => {
  return {
    type: actionTypes.REQ_TOUR_START
  };
};

const reqTourSuccess = (requestedTours) => {
  return {
    type: actionTypes.REQ_TOUR_SUCCESS,
    requestedTours
  };
};

const reqTourFailed = (error) => {
  return {
    type: actionTypes.REQ_TOUR_FAILED,
    error
  };
};

export const reqTour = (requestedTours, token) => {
  return dispatch => {
    dispatch(reqTourStart());

    axios.post("https://lucid-tours-default-rtdb.firebaseio.com/requestedTours.json?auth=" + token, requestedTours)
      .then(response => {
        dispatch(reqTourSuccess());
      })
      .catch(error => {
        dispatch(reqTourFailed(error));
      })
  };
};

export const reqClearError = () => {
  return {
    type: actionTypes.REQ_CLEAR_ERROR
  };
};

// fetching requested tours
const fetchReqToursStart = () => {
  return {
    type: actionTypes.FETCH_REQ_TOURS_START
  };
};

const fetchReqToursSuccess = (tourData) => {
  return {
    type: actionTypes.FETCH_REQ_TOURS_SUCCESS,
    tourData
  };
};

const fetchReqToursFailed = (error) => {
  return {
    type: actionTypes.FETCH_REQ_TOURS_FAILED,
    error
  };
};

export const fetchReqTours = (token, userId) => {
  return dispatch => {
    dispatch(fetchReqToursStart());
    const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';

    axios.get("https://lucid-tours-default-rtdb.firebaseio.com/requestedTours.json" + queryParams)
      .then(response => {
        let reqTours = [];
        for(const key in response.data) {
          reqTours.push({
            ...response.data[key],
            id: key
          })
        }
        dispatch(fetchReqToursSuccess(reqTours));
      })
      .catch(error => {
        dispatch(fetchReqToursFailed(error));
      })
  }
};

export const fetchReqToursClearError = () => {
  return {
    type: actionTypes.FETCH_REQ_TOURS_CLEAR_ERROR
  };
};

// deleting requested tour
const reqTourDeleteSuccess = (tourId) => {
  return {
    type: actionTypes.REQ_TOUR_DELETE_SUCCESS,
    tourId
  };
};

const reqTourDeleteFailed = (error) => {
  return {
    type: actionTypes.REQ_TOUR_DELETE_FAILED,
    error
  };
};

export const reqTourDelete = (tourId, token) => {
  return dispatch => {
    axios.delete(`https://lucid-tours-default-rtdb.firebaseio.com/requestedTours/${tourId}.json?auth=${token}`)
      .then(response => {
        dispatch(reqTourDeleteSuccess(tourId));
      })
      .catch(error => {
        dispatch(reqTourDeleteFailed(error));
      })
  }
};

// deleting all requested tours
const reqToursClearAllStart = () => {
  return {
    type: actionTypes.REQ_TOURS_CLEAR_ALL_START
  };
};

const reqToursClearAllSuccess = () => {
  return {
    type: actionTypes.REQ_TOURS_CLEAR_ALL_SUCCESS
  };
};

const reqToursClearAllFailed = (error) => {
  return {
    type: actionTypes.REQ_TOURS_CLEAR_ALL_FAILED,
    error
  };
};

export const reqToursClearAll = (token) => {
  return dispatch => {
    dispatch(reqToursClearAllStart());

    axios.delete("https://lucid-tours-default-rtdb.firebaseio.com/requestedTours.json?auth=" + token)
      .then(response => {
        dispatch(reqToursClearAllSuccess());
      })
      .catch(error => {
        dispatch(reqToursClearAllFailed(error));
      })
  };
};

export const clearReqTourDeleteError = () => {
  return {
    type: actionTypes.CLEAR_REQ_TOUR_DELETE_ERROR
  };
};
