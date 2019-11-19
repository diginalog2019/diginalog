import {SEARCH_CREATOR, UPDATE_CHECKED_HASHTAGS} from "./actionTypes";
import {REFRESH_PRODUCTS} from "./actionTypes";
import api from "../pages/utils/api";

export const searchCreator = (C_NICKNAME) => {
  return {
    type: SEARCH_CREATOR,
    C_NICKNAME,
  }
}

export const addToCheckedHashtags = (hashtag, checkedHashtags) => {
  if(checkedHashtags.indexOf(hashtag) == -1)
  {
    checkedHashtags = [...checkedHashtags, hashtag];
  }
  return {
    type:UPDATE_CHECKED_HASHTAGS,
    payload: checkedHashtags
  }
}

export const deleteFromCheckedHashtags = (hashtag, checkedHashtags) =>{
  let prevCheckedHashtags = [...checkedHashtags];
  let index = prevCheckedHashtags.indexOf(hashtag);
  prevCheckedHashtags.splice(index,1);
  console.log("deleteFromCheckedHashtags");
  console.log(prevCheckedHashtags);
  return {
    type:UPDATE_CHECKED_HASHTAGS,
    payload: prevCheckedHashtags
  }
}