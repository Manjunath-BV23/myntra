import { ADDTOCART, ADD_ORDER } from './action'
import { CURRENTITEM } from './action'
import { ADJUSTQTY} from './action'
import { REMOVECART} from './action'


const INITIAL_STATE = {
	cart:[],
	order:[],
}


export const cartReducer = (state=INITIAL_STATE, action) => {

	switch (action.type) {
    case ADDTOCART : 
	return {
		...state,
		cart:[...state.cart, action.payload],
	}

	case REMOVECART : 
	const data1 = state.cart.filter((el) => el.id !== action.payload.id)  
	//console.log(data)
	return {
		...state,
		cart:data1
     
	}
	case ADD_ORDER : 
	return {
		...state,
		order: action.payload,
	}
	case ADJUSTQTY : 
	return {
    
	}
	case CURRENTITEM : 
	return {
    
	}
	default: return state
	}
}
