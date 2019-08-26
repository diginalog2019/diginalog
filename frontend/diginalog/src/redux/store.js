import {combineReducers, createStore} from "redux";
import testReducer from './reducers/testReducer';

const rootReducer = combineReducers({testReducer});
export const store = createStore(rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

console.log(store);