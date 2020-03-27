import { ADD_TO_CART, DECREMENT_COUNT, INCREMENT_COUNT, REMOVE_FROM_CART, SEARCH_CARTITEMS } from "../actions/types";


const initialState = { items:[],cartItemsSearch:[] };

export default function(state=initialState, action){
    switch(action.type){
        case ADD_TO_CART: 
            return{...state,
                items:action.payload.cartItems,
                cartItemsSearch:action.payload.cartItems
            }
        case REMOVE_FROM_CART :
                return{...state,
                    items:action.payload.cartItems,
                    cartItemsSearch:action.payload.cartItems
                }
        case INCREMENT_COUNT:
                return{...state,
                    items:action.payload.cartItems,
                    cartItemsSearch:action.payload.cartItems
                }
        case DECREMENT_COUNT:
                return{...state,
                    items:action.payload.cartItems,
                    cartItemsSearch:action.payload.cartItems
                }
        case SEARCH_CARTITEMS:
                return{...state,
                    cartItemsSearch:action.payload.cartItemsSearch
                }
        default:
            return state;
    }
}