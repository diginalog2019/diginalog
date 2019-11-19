import {LOGIN_USER, SEARCH_CREATOR, LOGOUT_USER} from "./actionTypes";
import api from "../pages/utils/api";

export const searchCreator = (C_NICKNAME) => {
  return {
    type: SEARCH_CREATOR,
    C_NICKNAME,
  }
}

export const userPostFetch = user => {
  return dispatch => {
    return api.post(`/api/auth/register`, user)
        .then(resp => {
            console.log(resp);
          if (resp.data.data.message) {
            // Here you should have logic to handle invalid creation of a user.
            // This assumes your Rails API will return a JSON object with a key of
            // 'message' if there is an error with creating the user, i.e. invalid username
            console.log(resp.data.data.message);
          } else {
              console.log("register success");
            //localStorage.setItem("token", resp.data.data.jwt)
            dispatch(loginUser(resp.data.data.user))
          }
        })
  }
}

const loginUser = userObj => ({
  type: LOGIN_USER,
  payload: userObj
})

export const userLoginFetch = user => {
  return dispatch => {
      return api.post(`/api/auth/login`, user)
        .then(resp => {
            console.log(resp);
          if (resp.data.data.message) {
            // Here you should have logic to handle invalid login credentials.
            // This assumes your Rails API will return a JSON object with a key of
            // 'message' if there is an error
              console.log(resp.data.data.message);
          } else {
              console.log(resp.data.data.jwt);
            localStorage.setItem("token", resp.data.data.jwt);
            dispatch(loginUser(resp.data.data.user));
          }
        })
  }
}

export const getProfileFetch = () => {
    return dispatch => {
        const token = localStorage.token;
        if (token) {
            return api.get(`/api/auth/check?token=${token}`)
                .then(resp => {
                    console.log("getProfileFetch");
                    console.log(resp);
                    if (resp.data.message) {
                        // Here you should have logic to handle invalid creation of a user.
                        // This assumes your Rails API will return a JSON object with a key of
                        // 'message' if there is an error with creating the user, i.e. invalid username
                        console.log(resp.data.message);
                        localStorage.removeItem("token")
                    } else {
                        dispatch(loginUser({id:resp.data.info.id, admin:resp.data.info.admin}))
                    }
                })
        }
    }
}

export const logoutUser = () => ({
    type: LOGOUT_USER
})