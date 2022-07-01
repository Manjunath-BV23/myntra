

import axios from "axios";


export const GET_CART = "GET_CART";
export const GET_CART_LOADING = "GET_CART_LOADING";
export const GET_CART_ERROR = "GET_CART_ERROR";



export const getCart = (cart) => ({type: GET_CART, payload: cart})
export const getCartLoading = () => ({type: GET_CART_LOADING})
export const getCartError= () => ({type: GET_CART_ERROR})

export const getCartData = () => async (dispatch) => {
    dispatch(getCartLoading())

    const res = await axios.get(`https://myntra-updated.herokuapp.com/cart`)
    dispatch(getCart(res.data))
    
    // setProductData(res.data);
}

export const increaseQty = (id)=>{
    return {
        type:"INC",payload :id
    }
}


export const deccreaseQty = (id)=>{
    return {
        type:"DEC",payload :id
    }
}
export const delteQty = (id)=>{
    return {
        type:"REM",payload :id
    }
}

