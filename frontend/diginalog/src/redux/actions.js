<<<<<<< HEAD
export const refreshList = () => {
  return {
    type: REFRESH_LIST
=======
import {SEARCH_CREATOR} from "./actionTypes";

export const searchCreator = (C_NICKNAME) => {
  return {
    type: SEARCH_CREATOR,
    C_NICKNAME,
>>>>>>> feature/creator/list
  }
}