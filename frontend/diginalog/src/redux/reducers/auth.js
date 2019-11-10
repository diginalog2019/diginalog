import {LOGIN_USER} from "../actionTypes";

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
        default:
            return state;
    }
}
