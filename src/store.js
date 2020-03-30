import {createStore,applyMiddleware} from 'redux';
import rootReducer from './reducers';
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'; 

const initialstate={} 

if(localStorage.getItem('cartItems')){
  initialstate.cart = {items:JSON.parse(localStorage.getItem('cartItems')),
  cartItemsSearch:JSON.parse(localStorage.getItem('cartItems'))}
}

export default createStore(rootReducer,initialstate,composeWithDevTools(
    applyMiddleware(thunk),
  ));

