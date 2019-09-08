import {SEARCH_CREATOR} from "../actionTypes";

const creatorInitialState = {
  creator:[

  ],
  keyword: ' '
};
export const creatorReducer = (state = creatorInitialState, action) => {
  switch (action.type) {
    case SEARCH_CREATOR:
      return{

      }
    default:
      return state;
  }
}