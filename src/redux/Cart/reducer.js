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
		const check = state.cart.filter((el) => el.id === action.payload.id)
		if(check.length == 0){

			return {
				...state,
				cart:[...state.cart, action.payload],
			}
		}
		else {
			return state
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
