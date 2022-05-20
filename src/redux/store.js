import { applyMiddleware, createStore } from "redux";
import {userReducer } from "./User/reducer";
import { productReducer } from "./Products/reducer";
import { combineReducers } from "redux";
import { composeWithDevTools } from '@redux-devtools/extension'
import { cartReducer } from "./Cart/reducer";

const rootReducer = combineReducers({
    users: userReducer,
    products : productReducer,
    cart : cartReducer,
})

const loggerMiddleware = (store)=>(next)=>(action) =>{
    console.time("t1");
    next(action);
    console.timeEnd("t1")
}

export const store = createStore (
    rootReducer,
    applyMiddleware(loggerMiddleware)
    // window._REDUX_DEVTOOLS_EXTENSION_ && window._REDUX_DEVTOOLS_EXTENSION_()
)

console.log("initial",store.getState());


