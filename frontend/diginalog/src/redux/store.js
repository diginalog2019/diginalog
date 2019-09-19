import {combineReducers, createStore} from "redux";
import {adminReducer} from './reducers/admin';
import {creatorReducer} from "./reducers/creators";
const rootReducer = combineReducers({adminReducer}, {creatorReducer});

export const store = createStore(rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());