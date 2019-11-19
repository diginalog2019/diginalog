import {SEARCH_CREATOR} from "./actionTypes";

export const searchCreator = (nickname) => {
  return {
    type: SEARCH_CREATOR,
    nickname,
  }
}