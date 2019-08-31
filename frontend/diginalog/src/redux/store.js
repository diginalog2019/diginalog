import {combineReducers, createStore} from "redux";
import {creatorReducer} from "./reducers/creators";

const rootReducer = combineReducers({creatorReducer});
export const store = createStore(rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

console.log(store);