


const INITIAL_STATE = {
	cart:[],
	order:[],
}


export const cartReducer = (store=INITIAL_STATE, {type, payload}) => {

	switch (type) {
    case "GET_CART" : 
		// const check = store.cart.filter((el) => el.id === action.payload.id)
		return {
			...store,
			cart: payload,
		}
	case "GET_CART_LOADING":
		return {...store, loading: true}
	case "GET_CART_ERROR":
		return {...store, error: true}
	case "REM":
			const cartREMOVE = store.cart.filter((ele) => ele._id != payload)
			console.log('DELETED', cartREMOVE)
			return { ...store, cart: cartREMOVE }


	case "DEC":
		const decreaseCartIndex = store.cart.findIndex((ele) => ele._id == payload,)
		if (store.cart[decreaseCartIndex].qty >= 2) {
			store.cart[decreaseCartIndex].qty -= 1
			console.log("qty",store.cart[decreaseCartIndex].qty)
			return {
				...store,
				cart: [...store.cart]

			}
		}

	case "INC":
		const increaseCartIndex = store.cart.findIndex((ele) => ele._id == payload,)
		if (store.cart[increaseCartIndex].qty >= 0) {
			store.cart[increaseCartIndex].qty += 1


			return {
				...store,
				cart: [...store.cart]

			}
		}  
	default :
		return store
		// if(check.length == 0){

		// }
		// else {
		// 	return state
		// }

	// case REMOVECART : 
	// const data1 = state.cart.filter((el) => el.id !== action.payload.id)  
	// //console.log(data)
	// return {
	// 	...state,
	// 	cart:data1
     
	// }
	// case ADD_ORDER : 
	// return {
	// 	...state,
	// 	order: action.payload,
	// }
	// case ADJUSTQTY : 
	// return {
    
	// }
	// case CURRENTITEM : 
	// return {
    
	// }
	// default: return state
	}
}