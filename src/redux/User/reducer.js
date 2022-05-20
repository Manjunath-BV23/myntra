import { ADD_USER } from "./action";


const initialstate = {
    users : [],
}

export const userReducer = (store=initialstate,{type,payload}) => {
    switch(type) {
        case ADD_USER:
            return {
                ...store,
                users:[...payload]
            }   
        default :
            return store    
    }
}