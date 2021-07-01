import * as actionTypes from './actionTypes';
import axios from 'axios';

// auth start
const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

const authSuccess = (token, userID) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token, 
    userID
  };
};

const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error
  };
};

const postAditionalUserInfo = (userData, url) => {
  axios.post(url, userData)
    .then(res => {
      console.log(res);
    })
    .catch(error => {
      console.log(error);
    })
  
  localStorage.setItem("userFirstName", userData.firstName);
  return {
    type: actionTypes.POST_ADDITIONAL_USER_INFO,
    userFirstName: userData.firstName
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userID");
  localStorage.removeItem("expirationDate");
  localStorage.removeItem("userFirstName");

  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

const checkExpirationDate = (expirationDate) => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationDate * 1000);
  }
}

export const auth = (userData, formMethod) => {
  return dispatch => {
    dispatch(authStart());
    let url;
    let additionalData;
    if(formMethod === "signup") {
      url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAVdcUfbne-x4_GA99fqKMmuVXFSzALVBo";

      additionalData = {
        firstName: userData.firstName.value,
        lastName: userData.lastName.value,
        country: userData.country.value,
        city: userData.city.value,
        phone: userData.phone.value,
        email: userData.email.value
      };
    } else if(formMethod === "login") {
      url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAVdcUfbne-x4_GA99fqKMmuVXFSzALVBo";

      additionalData = null;
    }

    const mainData = {
      email: userData.email.value,
      password: userData.password.value,
      returnSecureToken: true
    };
    
    axios.post(url, mainData)
      .then(response => {
        const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
        localStorage.setItem("token", response.data.idToken);
        localStorage.setItem("userID", response.data.localId);
        localStorage.setItem("expirationDate", expirationDate);
        dispatch(authSuccess(response.data.idToken, response.data.localId));
        dispatch(checkExpirationDate(response.data.expiresIn));
        return {
          token: response.data.idToken, 
          userID: response.data.localId
        }
      })
      .then(res => {
        if(formMethod === "signup") { 
          additionalData.userId = res.userID;
          postAditionalUserInfo(additionalData, 'https://lucid-tours-default-rtdb.firebaseio.com/userData.json?auth=' + res.token);
        } else {
          return;
        }
      })
      .catch(error => {
        dispatch(authFail(error.response.data.error));
      })
  }
}

export const checkAuthState = () => {
  return dispatch => {
    const token = localStorage.getItem("token");
    if(!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));

      if(expirationDate > new Date()) {
        const userID = localStorage.getItem("userID");
        dispatch(authSuccess(token, userID));
        dispatch(checkExpirationDate((expirationDate.getTime() - new Date().getTime()) / 1000))
      } else {
        dispatch(logout());
      }
    }
  }
};

export const clearError = () => {
  return {
    type: actionTypes.CLEAR_ERROR
  };
};

export const clearAuthSuccessState = () => {
  return {
    type: actionTypes.CLEAR_AUTH_SUCCESS_STATE
  };
};

// get additional user info
const getAdditionalUserInfoStart = () => {
  return {
    type: actionTypes.GET_ADDITIONAL_USER_INFO_START
  };
};

const getAdditionalUserInfoSuccess = (userInfo) => {
  return {
    type: actionTypes.GET_ADDITIONAL_USER_INFO_SUCCESS,
    userInfo
  };
};

const getAdditionalUserInfoFailed = (error) => {
  return {
    type: actionTypes.GET_ADDITIONAL_USER_INFO_FAILED,
    error
  };
};

export const getAdditionalUserInfo = (token, userId) => {
  return dispatch => {
    dispatch(getAdditionalUserInfoStart());
    const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';

    axios.get("https://lucid-tours-default-rtdb.firebaseio.com/userData.json" + queryParams)
      .then(response => {
        let fetchedUserInfo;
        for(const key in response.data) {
          fetchedUserInfo = response.data[key];
          fetchedUserInfo.dataID = key;
        }
        
        dispatch(getAdditionalUserInfoSuccess(fetchedUserInfo));
      })
      .catch(error => {
        dispatch(getAdditionalUserInfoFailed(error));
      })
  };
};

// EDITING ADDITIONAL USER INFO
// 1. delete it first
const deleteAdditionalUserInfoStart = () => {
  return {
    type: actionTypes.DELETE_ADDITIONAL_USER_INFO_START
  };
};

const deleteAdditionalUserInfoSuccess = () => {
  return {
    type: actionTypes.DELETE_ADDITIONAL_USER_INFO_SUCCESS
  };
};

const deleteAdditionalUserInfoFailed = (error) => {
  return {
    type: actionTypes.DELETE_ADDITIONAL_USER_INFO_FAILED,
    error
  };
};

export const deleteAdditionalUserInfo = (token, userDataId) => {
  return dispatch => {
    dispatch(deleteAdditionalUserInfoStart());

    axios.delete("https://lucid-tours-default-rtdb.firebaseio.com/userData/" + userDataId + ".json?auth=" + token)
      .then(response => {
        dispatch(deleteAdditionalUserInfoSuccess());
      })
      .catch(error => {
        dispatch(deleteAdditionalUserInfoFailed(error));
      })
  };
};

// 2.post updated info
const postNewUserInfoStart = () => {
  return {
    type: actionTypes.POST_NEW_USER_INFO_START
  };
};

const postNewUserInfoSuccess = (newInfo) => {
  return {
    type: actionTypes.POST_NEW_USER_INFO_SUCCESS,
    newInfo
  };
};

const postNewUserInfoFailed = (error) => {
  return {
    type: actionTypes.POST_NEW_USER_INFO_FAILED,
    error
  };
};

export const postNewUserInfo = (newInfo, token) => {
  return dispatch => {
    dispatch(postNewUserInfoStart());

    axios.post("https://lucid-tours-default-rtdb.firebaseio.com/userData.json?auth=" + token, newInfo)
      .then(response => {
        
        dispatch(postNewUserInfoSuccess(newInfo));
      })
      .catch(error => {
        dispatch(postNewUserInfoFailed(error));
      })
  };
};
