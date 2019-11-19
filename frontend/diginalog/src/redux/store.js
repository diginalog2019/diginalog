import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunk from 'redux-thunk';
import {adminReducer} from './reducers/admin';
import {creatorReducer} from "./reducers/creators";
import {authReducer} from "./reducers/auth"
import {productsReducer} from "./reducers/products";

const rootReducer = combineReducers({authReducer},{adminReducer}, {creatorReducer},{productsReducer} );
export const store = createStore(rootReducer,{},
    compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));
//export const store = createStore(rootReducer,window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(applyMiddleware(thunk)));
