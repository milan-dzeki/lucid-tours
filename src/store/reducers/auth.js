import * as actionTypes from '../actions/actionTypes';

const initialState = {
  loading: false,
  error: null,
  token: null,
  userID: null,
  authSuccess: false,
  userInfo: null
};

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case(actionTypes.AUTH_START):
      return {
        ...state,
        error: null,
        loading: true
      };
    case(actionTypes.AUTH_SUCCESS):
      return {
        ...state,
        token: action.token,
        userID: action.userID,
        error: null,
        loading: false,
        authSuccess: true
      };
    case(actionTypes.AUTH_FAIL):
      return {
        ...state,
        loading: false,
        error: action.error,
        authSuccess: false
      };
    case(actionTypes.AUTH_LOGOUT):
      return {
        ...state,
        token: null,
        userID: null,
        authSuccess: false
      };
    case(actionTypes.CLEAR_ERROR):
      return {
        ...state,
        error: null,
        authSuccess: false
      };
    case(actionTypes.CLEAR_AUTH_SUCCESS_STATE):
      return {
        ...state,
        authSuccess: false
      };
    case(actionTypes.GET_ADDITIONAL_USER_INFO_START):
      return {
        ...state,
        loading: true
      };
    case(actionTypes.GET_ADDITIONAL_USER_INFO_SUCCESS):
      return {
        ...state,
        loading: false,
        userInfo: action.userInfo
      };
    case(actionTypes.GET_ADDITIONAL_USER_INFO_FAILED):
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case(actionTypes.DELETE_ADDITIONAL_USER_INFO_START):
      return {
        ...state,
        loading: true
      };
    case(actionTypes.DELETE_ADDITIONAL_USER_INFO_SUCCESS):
      return {
        ...state,
        loading: false,
        userInfo: null
      };
    case(actionTypes.DELETE_ADDITIONAL_USER_INFO_FAILED):
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case(actionTypes.POST_NEW_USER_INFO_START):
      return {
        ...state,
        loading: true
      };
    case(actionTypes.POST_NEW_USER_INFO_SUCCESS):
      return {
        ...state,
        loading: false,
        userInfo: action.newInfo
      };
    case(actionTypes.POST_NEW_USER_INFO_FAILED):
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default:
      return state;
  }
};

export default reducer;