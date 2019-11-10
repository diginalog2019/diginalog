import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunk from 'redux-thunk';
import {adminReducer} from './reducers/admin';
import {creatorReducer} from "./reducers/creators";
import {authReducer} from "./reducers/auth"

const rootReducer = combineReducers({adminReducer}, {creatorReducer}, {authReducer});
//export const store = createStore(rootReducer,compose(
//    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),applyMiddleware(thunk)));
export const store = createStore(rootReducer,applyMiddleware(thunk));