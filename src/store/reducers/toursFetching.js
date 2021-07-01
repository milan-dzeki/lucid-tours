import * as actionTypes from '../actions/actionTypes';
import { datesInfo } from '../../utilities';

const initialState = {
  loading: false, 
  error: null,
  deleteError: null,
  pastTours: [],
  presentTours: [],
  futureTours: []
};

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case(actionTypes.FETCH_TOURS_START):
      return {
        ...state,
        loading: true
      };
    case(actionTypes.FETCH_TOURS_SUCCESS):
      let pastTours = action.allTours.filter(tour => {
        const { presentDay, presentMonth, monthNames, tourMonth, tourDateOne, tourDateTwo } = datesInfo(tour);
        
        if(monthNames.indexOf(tourMonth) < presentMonth || (monthNames.indexOf(tourMonth) === presentMonth && tourDateOne < presentDay && tourDateTwo < presentDay)) {
          tour.status = "past";
          return tour;
        } else {
          return null;
        }
      });

      let presentTours = action.allTours.filter(tour => {
        const { presentDay, presentMonth, monthNames, tourMonth, tourDateOne, tourDateTwo } = datesInfo(tour);

        if(monthNames.indexOf(tourMonth) === presentMonth && (presentDay >= tourDateOne && presentDay <= tourDateTwo)) {
          tour.status = "present";
          return tour;
        } else {
          return null;
        }
      });

      let futureTours = action.allTours.filter(tour => {
        const { presentDay, presentMonth, monthNames, tourMonth, tourDateOne, tourDateTwo } = datesInfo(tour);

        if(monthNames.indexOf(tourMonth) > presentMonth || (monthNames.indexOf(tourMonth) === presentMonth && tourDateOne > presentDay && tourDateTwo > presentDay)) {
          tour.status = "future";
          return tour;
        } else {
          return null;
        }
      });

      return {
        ...state,
        loading: false,
        pastTours: pastTours,
        presentTours: presentTours,
        futureTours: futureTours
      };
    case(actionTypes.FETCH_TOURS_FAILED):
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case(actionTypes.DELETE_SINGLE_TOUR_SUCCESS):
      let newPastTours = state.pastTours.filter(tour => tour.id !== action.tourId);
      let newPresentTours = state.presentTours.filter(tour => tour.id !== action.tourId);
      let newFutureTours = state.futureTours.filter(tour => tour.id !== action.tourId);
      return {
        ...state,
        pastTours: newPastTours,
        presentTours: newPresentTours,
        futureTours: newFutureTours
      };
    case(actionTypes.DELETE_SINGLE_TOUR_FAILED):
      return {
        ...state,
        deleteError: action.error
      };
    case(actionTypes.CLAER_TOURS_START):
      return {
        ...state,
        loading: true
      };
    case(actionTypes.CLAER_TOURS_SUCCESS):
      let potentialyClearedPastTours = [...state.pastTours];
      let potentialyClearedPresentTours = [...state.presentTours];
      let potentialyClearedFutureTours = [...state.futureTours];

      if(potentialyClearedPastTours.length !== 0 && [0].status === action.tourStatus) {
        potentialyClearedPastTours = [];
      }
      if(potentialyClearedPresentTours.length !== 0 && potentialyClearedPresentTours[0].status === action.tourStatus) {
        potentialyClearedPresentTours = [];
      }
      if(potentialyClearedFutureTours.length !== 0 && potentialyClearedFutureTours[0].status === action.tourStatus) {
        potentialyClearedFutureTours = [];
      }
      return {
        ...state,
        loading: false,
        pastTours: potentialyClearedPastTours,
        presentTours: potentialyClearedPresentTours,
        futureTours: potentialyClearedFutureTours
      };
    case(actionTypes.CLAER_TOURS_FAILED):
      return {
        ...state,
        loading: false,
        deleteError: action.error
      };
    case(actionTypes.CLEAR_DELETE_TOUR_ERROR):
      return {
        ...state,
        deleteError: null
      }
    default:
      return state;
  }
};

export default reducer;