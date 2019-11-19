import {REFRESH_LIST, SEARCH_CREATOR} from "../actionTypes";

const creatorInitialState = {
  refresh_count: 0,
  keyword: ' '
};
export const creatorReducer = (state = creatorInitialState, action) => {
  switch (action.type) {
    case REFRESH_LIST:
      return {
        ...state,
        refresh_count: state.refresh_count + 1
      }
    case SEARCH_CREATOR:
      return{
        ...state,
        keyword: action.keyword
      }
    default:
      return state;
  }
}