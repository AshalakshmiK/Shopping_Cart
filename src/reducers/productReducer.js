
const initialstate = {items:[],searchItems:[],searchTerm:"",filter:"",range:{"min":100,"max":1000},isLoading:true,sort:""}

export default function(state=initialstate,action){
    switch(action.type){
        case 'FETCH_PRODUCTS':

                   return {...state,items:action.payload,searchItems:action.payload,isLoading:action.loading,sort:""}

        case 'SORT_BY_PRICE':
        
                   return {...state,
                            sort:action.payload.sort,
                            searchItems:action.payload.items,
                          }

        case 'FILTER_BY_RANGE':
                          
                          return {...state,
                                  searchItems:action.payload.items,
                                  filter:action.payload.filter,
                                  range:action.payload.range}
        
        case 'SEARCH':
                        const {search} = action.payload;
                        let products
                        // if(search==="" && action.payload.filter!==""){
                        //     console.log("called new conditon")
                        //     if(action.payload.sort==="ascending"){
                        //            products=action.payload.fullList.sort((a,b)=>(a.price-a.price*a.discount/100>b.price-b.price*b.discount/100 ? 1: -1)).filter((a)=>{
                        //                return a.price>action.payload.range.min && a.price<action.payload.range.max;
                        //            })
                        //        }else if(action.payload.sort==="descending"){
                        //            products=action.payload.fullList.sort((a,b)=>(a.price-a.price*a.discount/100<b.price-b.price*b.discount/100 ? 1: -1)).filter((a)=>{
                        //                return a.price>action.payload.range.min && a.price<action.payload.range.max;
                        //            })
                        //        }else if(action.payload.sort==="discount"){
                        //            console.log("discount")
                        //         products=action.payload.fullList.sort((a,b)=>(a.discount>b.discount ? 1: -1)).filter((a)=>{
                        //             return a.price>action.payload.range.min && a.price<action.payload.range.max;
                        //         })
                        //        }
                        //        else{
                        //        products=action.payload.fullList.slice().filter((a)=>{
                        //             return a.price>action.payload.range.min && a.price<action.payload.range.max;
                        //        })
                        //       console.log("products",products)
                        //       return{...state,searchItems:products,searchTerm:action.payload.search}
                        //       }
                        //     }
                        //     else
                        //     {
                                if(action.payload.sort==="ascending"){
                                       products=action.payload.fullList.sort((a,b)=>(a.price-a.price*a.discount/100>b.price-b.price*b.discount/100 ? 1: -1)).filter((a)=>{
                                           return a.price>action.payload.range.min && a.price<action.payload.range.max;
                                       }).filter((val) => val.name.toLowerCase().indexOf(search.toLowerCase())>-1)
                                   }else if(action.payload.sort==="descending"){
                                       products=action.payload.fullList.sort((a,b)=>(a.price-a.price*a.discount/100<b.price-b.price*b.discount/100 ? 1: -1)).filter((a)=>{
                                           return a.price>action.payload.range.min && a.price<action.payload.range.max;
                                       }).filter((val) => val.name.toLowerCase().indexOf(search.toLowerCase())>-1)
                                   }else if(action.payload.sort==="discount"){
                                    products=action.payload.fullList.sort((a,b)=>(a.discount>b.discount ? 1: -1)).filter((a)=>{
                                        return a.price>action.payload.range.min && a.price<action.payload.range.max;
                                    }).filter((val) => val.name.toLowerCase().indexOf(search.toLowerCase())>-1)
                                   }
                                   else{
                                   products=action.payload.fullList.slice().filter((a)=>{
                                        return a.price>action.payload.range.min && a.price<action.payload.range.max;
                                   }).filter((val) => val.name.toLowerCase().indexOf(search.toLowerCase())>-1)
                                }
                                console.log("last else called")
                            return{
                                ...state,searchItems:products,    
                                        searchTerm:action.payload.search,
                                }
                      //  }
                        
                         
        default:
                   // console.log("default called")
                    return state;
    }
}