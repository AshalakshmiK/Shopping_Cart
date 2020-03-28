import React, { Component } from 'react';
import {connect} from 'react-redux'

import {addToCart,removeFromCart,incrementCount,decrementCount,searchCartItems} from '../actions/cartActions';
import {fetchProducts} from '../actions/productActions'

import Header from './Header'
class Cart extends Component{
  
   
    onChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        },()=>{
            this.props.searchCartItems(this.props.cartItems,this.state.searchTerm)
        })
    }
    render(){
        const length=this.props.cartItemsSearch.length
        const total=this.props.cartItemsSearch.reduce((r,item)=>{
           return item.price*item.count+r;
        },0)

        const discount=this.props.cartItemsSearch.reduce((r,item)=>{
            return (item.price*item.discount/100*item.count)+r
        },0)

        let cart,totalPriceTable;
        if(this.props.cartItemsSearch.length){
          cart =  this.props.cartItemsSearch.map(item=>{
                return <div key={item.id} className="cartitem"> 
                        <img src={item.img_url} alt="" className="itemimage"/>
                        <div className="cartitem1">
                        <table><tbody><tr><td>
                            {item.name}</td></tr>
                         <tr><td>&#8377;{item.price-item.price*item.discount/100} <span className="price">{item.price}</span> <span className="discount">{item.discount}% off</span></td></tr></tbody></table>
                        </div>
                        <div><table><tbody><tr><td>
                        <span onClick={(e)=>this.props.decrementCount(this.props.cartItems,item.id)} className="cartCountDiv">-</span></td>
                         <td><span className="itemCount">  {item.count}</span></td>
                        <td><span onClick={(e)=>this.props.incrementCount(this.props.cartItems,item.id)} className="cartCountDiv">+</span></td></tr></tbody></table></div>
                       <div> <button onClick={(e)=>this.props.removeFromCart(this.props.cartItems,item)}>Remove</button></div>
                    </div>
            })
            totalPriceTable=<div className="totalprice">
            <table><tbody><tr><td> PRICE DETAILS<hr/></td></tr>

            <tr><td>Price({length} item)</td><td> :</td><td> &#8377;{total}</td></tr>
            <tr><td>discount<hr/>  </td><td>                :</td><td> &#8377;{discount}<hr/> </td></tr>

            <tr><td>Total Payable  </td><td>           :</td><td> &#8377;{total-discount}</td></tr>
            </tbody></table>
            </div>
            
        }
       else if(this.props.cartItems.length===0){
            cart=<h5>Your cart is empty</h5>
            totalPriceTable=""
        } else{
            cart=<h5>No matching products found in cart</h5>
            totalPriceTable=""
        }
        return(
        <div className="cartContainer">
             <div className="navbar">
                <Header onChange={this.onChange}/>
            </div>
            <div className="cartbody">
                <div className="cartitems">
                    {cart}                
                </div>
                {totalPriceTable}
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
        cartItems:state.cart.items,
        cartItemsSearch:state.cart.cartItemsSearch,
        searchTerm:state.products.searchTerm
    })

export default connect(mapStateToProps,{addToCart,removeFromCart,fetchProducts,incrementCount,decrementCount,
    searchCartItems})(Cart);
