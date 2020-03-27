import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar,faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import React, { Component } from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

import Search from './Search';

class Header extends Component{
    constructor(props){
        super(props)
        this.state={
            countVisibility:"none",
        }
    }

    
    render(){
        const count=this.props.cartItems.length;
        // if(count>0){
        //     if(this.state.countVisibility===""){
        //         this.setState({
        //             countVisibility:"none"
        //         })
        //     }
        //     else if(this.state.countVisibility==="none"){
        //         this.setState({
        //             countVisibility:""
        //         })
        //     }
        // }
       
        return(
            <React.Fragment>

                <Link to="/">
               <FontAwesomeIcon icon={faStar} style={{"color":"yellow"}} className="staricon"/>
                </Link>
               <div style={{"position":"absolute",right:"60px",top:"0px"}}>
                    <Search onChange={this.props.onChange}/>
                </div>
                <Link to="/cart" >
                <div style={{"position":"absolute",right:"0px",top:"0px"}}>
                    <FontAwesomeIcon icon={faShoppingCart} className="cart"/>
                    <span  className="count"> {count} </span>
                </div>
                </Link>
               
            
        
               
               </React.Fragment>
        )
    }      
}


const mapStateToProps=state=>(
    { 
        cartItems:state.cart.items
    })
export default connect(mapStateToProps)(Header);