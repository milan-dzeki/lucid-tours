import * as actionTypes from './actionTypes';
import axios from 'axios';

const fetchToursStart = () => {
  return {
    type: actionTypes.FETCH_TOURS_START
  };
};

const fetchToursSuccess = (allTours) => {
  return {
    type: actionTypes.FETCH_TOURS_SUCCESS,
    allTours
  };
};

const fetchToursFailed = (error) => {
  return {
    type: actionTypes.FETCH_TOURS_FAILED,
    error
  };
};

export const fetchTours = (token, userId) => {
  return dispatch => {
    dispatch(fetchToursStart());
    const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';

    axios.get("https://lucid-tours-default-rtdb.firebaseio.com/tourData.json" + queryParams)
      .then(response => {
        let fetchedTours = [];
        for(const key in response.data) {
          fetchedTours.push({
            ...response.data[key],
            id: key
          })
        }
        dispatch(fetchToursSuccess(fetchedTours));
      })
      .catch(error => {
        dispatch(fetchToursFailed(error));
      })

  };
};

// delete single tour
const deleteSingleTourSuccess = (tourId) => {
  return {
    type: actionTypes.DELETE_SINGLE_TOUR_SUCCESS,
    tourId
  };
};

const deleteSingleTourFailed = (error) => {
  return {
    type: actionTypes.DELETE_SINGLE_TOUR_FAILED,
    error
  };
};

export const deleteSingleTour = (tourId, token) => {
  return dispatch => {
    axios.delete(`https://lucid-tours-default-rtdb.firebaseio.com/tourData/${tourId}.json?auth=` + token)
      .then(response => {
        dispatch(deleteSingleTourSuccess(tourId));
      })
      .catch(error => {
        dispatch(deleteSingleTourFailed(error));
      })
  };
};

// clear all tours from particular box (past, present or future)
const clearToursStart = () => {
  return {
    type: actionTypes.CLAER_TOURS_START
  };
};

const clearToursSuccess = (tourStatus, targetedTourList) => {
  return {
    type: actionTypes.CLAER_TOURS_SUCCESS,
    tourStatus,
    targetedTourList
  };
};

const clearToursFailed = (error) => {
  return {
    type: actionTypes.CLAER_TOURS_FAILED,
    error
  };
};

export const clearTours = (tourStatus, targetedTourList, token) => {
  return dispatch => {
    dispatch(clearToursStart());
    targetedTourList.forEach(tour => {
      if(tour.status === tourStatus) {
        axios.delete(`https://lucid-tours-default-rtdb.firebaseio.com/tourData/${tour.id}.json?auth=${token}`)
        .then(response => {
          dispatch(clearToursSuccess(tourStatus));
        })
        .catch(error => {
          dispatch(clearToursFailed(error));
        })
      }
    })
    
  }
};

export const clearDeleteTourError = () => {
  return {
    type: actionTypes.CLEAR_DELETE_TOUR_ERROR
  };
};