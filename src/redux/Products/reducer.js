import { GET_PRODUCT, GET_PRODUCT_ERROR, GET_PRODUCT_LOADING} from "./action";


const initialState = {
    products : [],
    loading: false,
    error: false,
}

export const productReducer = (store=initialState,{type,payload}) => {
    switch(type) {
        case GET_PRODUCT:
            return {
                ...store,
                products: payload
            }
        case GET_PRODUCT_LOADING:
                return {...store, loading: true}
        case GET_PRODUCT_ERROR:
            return {...store, error: true}  
        default :
            return store    
    }
}