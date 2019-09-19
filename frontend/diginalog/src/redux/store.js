import {combineReducers, createStore} from "redux";
import {adminReducer} from './reducers/admin';
const rootReducer = combineReducers({adminReducer});
export const store = createStore(rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
