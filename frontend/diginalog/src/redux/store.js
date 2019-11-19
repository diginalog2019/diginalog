import {applyMiddleware,combineReducers, createStore} from "redux";
import thunk from 'redux-thunk';
import {adminReducer} from './reducers/admin';
import {creatorReducer} from "./reducers/creators";
import {productsReducer} from "./reducers/products";

const rootReducer = combineReducers({productsReducer},{adminReducer}, {creatorReducer});

//export const store = createStore(rootReducer,
//  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
export const store = createStore(rootReducer,window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(applyMiddleware(thunk)));