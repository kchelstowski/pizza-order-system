import logger from "redux-logger"
import {applyMiddleware, createStore} from "redux";

import thunk from "redux-thunk";

import {composeWithDevTools} from "redux-devtools-extension";
import RootReducer from "./RootReducer";

export const store = createStore(RootReducer, composeWithDevTools(applyMiddleware(logger, thunk)))


export default store