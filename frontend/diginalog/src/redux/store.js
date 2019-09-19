import {combineReducers, createStore} from "redux";
<<<<<<< HEAD
import {adminReducer} from './reducers/admin';
const rootReducer = combineReducers({adminReducer});
=======
import {creatorReducer} from "./reducers/creators";

const rootReducer = combineReducers({creatorReducer});
>>>>>>> feature/creator/list
export const store = createStore(rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
