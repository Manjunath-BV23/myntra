import { applyMiddleware, compose, createStore, } from "redux";
import {userReducer } from "./User/reducer";
import { productReducer } from "./Products/reducer";
import { combineReducers } from "redux";
import { cartReducer } from "./Cart/reducer";
import { loginReducer } from "./signin/reducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
    users: userReducer,
    products : productReducer,
    cart : cartReducer,
    SignIn: loginReducer,
})

const loggerMiddleware = (store)=>(next)=>(action) =>{
    console.log("action: ", action)
    if(typeof action == "function"){
        return action(store.dispatch)
    }
    next(action);
}

export const store = createStore (
    rootReducer,
    applyMiddleware(thunk)
    // compose(applyMiddleware(thunk), window._REDUX_DEVTOOLS_EXTENSION_ && window._REDUX_DEVTOOLS_EXTENSION_())
    
    
)

console.log("initial",store.getState());


