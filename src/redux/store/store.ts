import { createStore, compose } from "redux";
import rootReducer from "../reducers/index";

//configure redux extention
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//.................

const store = createStore(rootReducer, composeEnhancers());

export default store;
