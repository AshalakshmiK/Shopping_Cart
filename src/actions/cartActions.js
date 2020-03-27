import {ADD_TO_CART,DECREMENT_COUNT,INCREMENT_COUNT,REMOVE_FROM_CART,SEARCH_CARTITEMS} from './types';

export const addToCart=(items,product)=>(dispatch)=>{
    const cartItems=items.slice();
    let productAlreadyInCart = false;
    cartItems.forEach(item => {
        if(item.id === product.id){
            productAlreadyInCart = true;
            item.count++;
        }
    });
    if(!productAlreadyInCart){
        cartItems.push({...product,count:1})
    }
    localStorage.setItem("cartItems",JSON.stringify(cartItems));
    return dispatch({
        type:ADD_TO_CART,
        payload:{cartItems:cartItems}
    })
}

export const removeFromCart=(items,product)=>(dispatch)=>{
    const cartItems = items.slice().filter(itm=>itm.id!== product.id)
    localStorage.setItem("cartItems",JSON.stringify(cartItems));

    return dispatch({
        type:REMOVE_FROM_CART,
        payload: {cartItems}
    })
}

export const incrementCount=(product,id)=>(dispatch)=>{
    const cartItems = product.slice();
    cartItems.forEach(a=>{
        if(a.id===id){
            a.count=a.count+1;            
        }
    })
    return dispatch({
        type:INCREMENT_COUNT,
        payload: {cartItems}
    })
}

export const decrementCount=(product,id)=>(dispatch)=>{
    const cartItems = product.slice();
    
    cartItems.forEach(a=>{
        if(a.id===id && a.count>1){
            a.count=a.count-1;            
        }
    })
    return dispatch({
        type:DECREMENT_COUNT,
        payload: {cartItems}
    })
}

export const searchCartItems=(items,search)=>(dispatch)=>{

    let cartItemsSearch
    if(search!==""){
        cartItemsSearch=items.slice().filter(a=>{
         return   a.name.toLowerCase().includes(search.toLowerCase())
         })
    }
    else{
        cartItemsSearch=items.slice()
    } 

    return dispatch({
        type:SEARCH_CARTITEMS,
        payload:{cartItemsSearch}
    })
}