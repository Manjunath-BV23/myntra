import { ADD_PRODUCT} from "./action";


const initialState = {
    products : [],
}

export const productReducer = (store=initialState,{type,payload}) => {
    switch(type) {
        case ADD_PRODUCT:
            return {
                ...store,
                products: payload
            }    
        default :
            return store    
    }
}