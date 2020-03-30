import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import React, { Component } from 'react';
import {connect} from 'react-redux'

import {addToCart} from '../actions/cartActions'
import {fetchProducts,sortByPrice,search} from '../actions/productActions'
import Filter from './Filter'
//import throttle from 'lodash.throttle';
import Header from './Header'
import Sort from './Sort';



class ShoppingList extends Component{
    constructor(props){
        super(props)
        this.state={
            isMobile: false,
        }
    }

    onWindowResize = () => {
       //console.log(window.innerWidth)
        //return throttle(() => {
           // console.log("throttle called")
            this.setState({ isMobile: window.innerWidth < 600 })
       //  }, 200);
         // alert(this.state.isMobile)
        //this.setState({ isMobile: window.innerWidth < 700 });
    }
    componentDidMount(){
        this.props.fetchProducts(this.props.Loading)
        window.addEventListener('load', this.onWindowResize);
        window.addEventListener('resize', this.onWindowResize);
        
    }
      
 
    componentWillUnmount() {
        window.removeEventListener('resize', this.onWindowResize);
      }
      onChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        },()=>{
            this.props.search(this.state.searchTerm,this.props.products,
                this.props.filter,this.props.range,this.props.sort)
            })    
    }
    render(){
    const { isMobile } = this.state;
    let prod;
   // console.log(this.props.searchproducts.length)
    if(this.props.searchproducts.length){
        prod=this.props.searchproducts.map(pro=>{
            return <div className="productListItem"  key={pro.id}>
                     <img src="https://lorempixel.com/500/600/technics/" alt="" className="itemimage"/>
                     <div>{pro.name}</div>
                     <div>&#8377;{pro.price-pro.price*pro.discount/100} <span className="price"> {pro.price}</span> <span className="discount">{pro.discount}% off</span> </div>
                     <button onClick={()=>this.props.addToCart(this.props.cartItems,pro)}>Add to cart</button>
                   </div>
         })
    }else if(this.props.searchproducts.length===0 && this.props.searchTerm.length){
        prod=<h1>No matching Products found</h1>
    }
     
        return(          
             <div className="gridConainer">
                <div className="navbar">
                    <Header onChange={this.onChange}/>
                </div>
                <div className="left">
                    <Filter isMobile={isMobile}/>
                </div>
                <div className="sort">
                    <Sort isMobile={isMobile}/>
                </div> 
                <div  className="productlist">
                 {this.props.Loading}
                   {this.props.Loading?<div style={{fontsize:"20px",textAlign:"center"}}><h1>Loading</h1><FontAwesomeIcon  icon={faSpinner} className="fa-spin"/></div>:""} 
                   
                   {prod}
                </div>
                <div className="footer">
                     &copy; Copyright
                 </div>
            </div>
           
        )
    }      
}

const mapStateToProps=state=>(
{ 
    products:state.products.items,
    cartItems:state.cart.items,
    searchproducts:state.products.searchItems,
    filter:state.products.filter,
    range:state.products.range,
    sort:state.products.sort,
    Loading:state.products.isLoading,
    searchTerm:state.products.searchTerm
})

export default connect(mapStateToProps,{addToCart,fetchProducts,search,sortByPrice})(ShoppingList);