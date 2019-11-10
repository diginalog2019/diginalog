import {LOGIN_USER, SEARCH_CREATOR} from "./actionTypes";
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
            localStorage.setItem("token", resp.data.data.jwt)
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
    return fetch("http://localhost:3000/api/v1/login", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({user})
    })
        .then(resp => resp.json())
        .then(data => {
          if (data.message) {
            // Here you should have logic to handle invalid login credentials.
            // This assumes your Rails API will return a JSON object with a key of
            // 'message' if there is an error
          } else {
            localStorage.setItem("token", data.jwt)
            dispatch(loginUser(data.user))
          }
        })
  }
}