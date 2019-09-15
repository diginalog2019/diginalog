import {combineReducers, createStore} from "redux";
import {testReducer} from './reducers/testReducer';

export const store = createStore(testReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

