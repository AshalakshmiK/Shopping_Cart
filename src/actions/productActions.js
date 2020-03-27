import { FETCH_PRODUCTS, FILTER_BY_RANGE, SEARCH, SORT_BY_PRICE } from "./types";

export const fetchProducts=(loading)=>(dispatch)=>{
   fetch(`https://api.myjson.com/bins/qzuzi`).then(res=>res.json())
        .then(data=>{
            loading=false
            return dispatch({
                type:FETCH_PRODUCTS,
                payload:data,
                loading:loading
            })
        })
}

export const filterByPriceRange=(items,range,sortType,searchItems,searchTerm,minvalue,maxvalue)=>(dispatch)=>{
    let filter
    if(minvalue===range.min && maxvalue===range.max){
        filter=""
    }else{
        filter="set"
    }
    let products;

    if(sortType==="ascending"){
               products=items.sort((a,b)=>(a.price-a.price*a.discount/100>b.price-b.price*b.discount/100 ? 1: -1)).filter((a)=>{
                   return a.price>range.min && a.price<range.max;
               }).filter(a=>a.name.toLowerCase().includes(searchTerm.toLowerCase()))
           }else if(sortType==="descending"){
               products=items.sort((a,b)=>(a.price-a.price*a.discount/100<b.price-b.price*b.discount/100 ? 1: -1)).filter((a)=>{
                   return a.price>range.min && a.price<range.max;
               }).filter(a=>a.name.toLowerCase().includes(searchTerm.toLowerCase()))
           }else if(sortType==="discount"){
            products=items.sort((a,b)=>(a.discount>b.discount?1:-1)).filter((a)=>{
                return a.price>range.min && a.price<range.max;
            }).filter(a=>a.name.toLowerCase().includes(searchTerm.toLowerCase()))
           }
           else{
               products=items.slice().filter((a)=>{
                   return a.price>range.min && a.price<range.max;
               }).filter(a=>a.name.toLowerCase().includes(searchTerm.toLowerCase()))
           }
  
    return dispatch({
        type:FILTER_BY_RANGE,
        payload: {
            items:products,
            filter,
            range
        }
    })
}

export const search=(search,fullList,filter,range,sort)=>(dispatch)=>{
    return dispatch({
       type:SEARCH,
       payload:{
           search,
           fullList,
           filter,
           range,
           sort
       }
   })
}

export const sortByPrice=(items,sortorder,searchTerm,range)=>(dispatch)=>{
    let products
    if(sortorder==="ascending" || sortorder==="descending"){

       products=items.slice().sort((a,b)=>(sortorder === "ascending")?
     ( a.price-a.price*a.discount/100>b.price-b.price*b.discount/100 ? 1:-1)
     :( a.price-a.price*a.discount/100<b.price-b.price*b.discount/100 ? 1: -1 )).filter((a)=>{
        return a.price>range.min && a.price<range.max;
    }).filter(c=>c.name.toLowerCase().includes(searchTerm.toLowerCase()))

    }else if(sortorder==="discount"){
      products=items.slice().sort((a,b)=>(a.discount>b.discount?1:-1)).filter((a)=>{
        return a.price>range.min && a.price<range.max;
    }).filter(a=>a.name.toLowerCase().includes(searchTerm.toLowerCase()))
    }
    else{
        products=items.slice().sort((a,b)=>(a.id>b.id ? 1: -1)).filter((a)=>{
                   return a.price>range.min && a.price<range.max;
               }).filter(a=>a.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    return dispatch({
        type:SORT_BY_PRICE,
        payload : 
        {
          items:  products,
          sort:   sortorder
        }
    })
}


