import {REFRESH_PRODUCTS, UPDATE_CHECKED_HASHTAGS, UPDATE_HASHTAGS, UPDATE_PRODUCTS} from "../actionTypes";

const productsInitialState = {
    // pageSize:10,
    // totalCount: 0,
    // currentPage: 1,
    // products: [],
    // hashtags: [],
    checkedHashtags: []
}

export const productsReducer = (state = productsInitialState, action) => {
    switch(action.type) {
        case UPDATE_CHECKED_HASHTAGS:
            console.log("update checked hashtags");
            return {
                checkedHashtags: action.payload
            }
        default:
            return state;
    }
}