import {REFRESH_LIST} from "../actionTypes";

const adminInitialState = {
  refresh_count: 0
}
export const adminReducer = (state = adminInitialState, action) => {
  switch (action.type) {
    case REFRESH_LIST:
      return {
        ...state,
        refresh_count: state.refresh_count + 1
      }
    default:
      return state;
  }
}