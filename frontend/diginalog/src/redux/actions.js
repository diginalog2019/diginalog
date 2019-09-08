import {SEARCH_CREATOR} from "./actionTypes";

export const searchCreator = (C_NICKNAME) => {
  return {
    type: SEARCH_CREATOR,
    C_NICKNAME,
  }
}