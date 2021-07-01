import * as actionTypes from './actionTypes';
import axios from 'axios';

const bookTourStart = () => {
  return {
    type: actionTypes.BOOK_TOUR_START
  };
};

const bookTourSuccess = () => {
  return {
    type: actionTypes.BOOK_TOUR_SUCCESS
  };
};

const bookTourFailed = (error) => {
  return {
    type: actionTypes.BOOK_TOUR_FAILED,
    error
  };
};

export const bookClearError = () => {
  return {
    type: actionTypes.BOOK_CLEAR_ERROR
  };
};

export const bookTour = (tourData, token) => {
  return dispatch => {
    dispatch(bookTourStart());
    
    axios.post("https://lucid-tours-default-rtdb.firebaseio.com/tourData.json?auth=" + token, tourData)
      .then(response => {
        dispatch(bookTourSuccess());
      })
      .catch(error => {
        dispatch(bookTourFailed(error));
      })
  };
};