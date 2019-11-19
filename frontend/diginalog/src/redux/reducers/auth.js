import {LOGIN_USER, LOGOUT_USER} from "../actionTypes";

const initialState = {
    currentUser: {}
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_USER:
            return {
                ...state,
                currentUser: action.payload
            }
        case LOGOUT_USER:
            return {...state, currentUser: {} }
        default:
            return state;
    }
}
