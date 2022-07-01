import axios from "axios";


export const GET_PRODUCT = "GET_PRODUCT";
export const GET_PRODUCT_LOADING = "GET_PRODUCT_LOADING";
export const GET_PRODUCT_ERROR = "GET_PRODUCT_ERROR";



export const getProduct = (product) => ({type: GET_PRODUCT, payload: product})
export const getProductLoading = () => ({type: GET_PRODUCT_LOADING})
export const getProductError= () => ({type: GET_PRODUCT_ERROR})

export const getProductData = () => async (dispatch) => {
    dispatch(getProductLoading())

    const res = await axios.get(`https://myntra-updated.herokuapp.com/products`)
    dispatch(getProduct(res.data))
    
    // setProductData(res.data);
}

